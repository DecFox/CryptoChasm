package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"cryptochasm.com/db"
	"cryptochasm.com/utils"
	"github.com/go-chi/chi"
	"go.mongodb.org/mongo-driver/bson"
)

func GetAllTokens(w http.ResponseWriter, r *http.Request) {
	tokens := mh.GetTokens(bson.M{"listed": true})
	json.NewEncoder(w).Encode(tokens)
}

func GetByHash(w http.ResponseWriter, r *http.Request) {
	metaHash := chi.URLParam(r, "metahash")

	if metaHash == "" {
		http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
		return
	}

	token := &db.Token{}
	err := mh.GetSingleToken(token, bson.M{"metaHash": metaHash})
	if err != nil {
		http.Error(w, http.StatusText(404), 404)
		return
	}

	json.NewEncoder(w).Encode(token)
}

func MintToken(w http.ResponseWriter, r *http.Request) {
	formData, err := ProcessMultipart(r)
	if err != nil {
		fmt.Println("error processing form")
		http.Error(w, fmt.Sprintln(err), http.StatusBadRequest)
		return
	}

	resp, err := cldh.UploadToken(formData.File, formData.FileHead, formData.Minter)
	if err != nil {
		fmt.Println("error processing form")
		http.Error(w, fmt.Sprintln(err), http.StatusBadRequest)
		return
	}

	tokenURI := resp.SecureURL
	tokenMetadata := &utils.IpfsMetadata{
		Name:        formData.Name,
		Description: formData.Description,
		Minter:      formData.Minter,
		TokenURI:    tokenURI,
	}

	// Pin metadata to IPFS
	metaRsp, err := utils.PinJSONToIPFS(tokenMetadata, pinata_key, pinata_secret)
	if err != nil {
		http.Error(w, fmt.Sprintln(err), http.StatusBadRequest)
		return
	}

	PresentToken := &db.Token{}
	token := db.Token{
		MetaHash:     metaRsp.IpfsHash,
		Minter:       formData.Minter,
		MintedOn:     metaRsp.Timestamp,
		Name:         formData.Name,
		Description:  formData.Description,
		TokenGateway: tokenURI,
	}

	// Check if token exists in DB
	err = mh.GetSingleToken(PresentToken, bson.M{"metaHash": token.MetaHash})
	if err == nil {
		http.Error(w, http.StatusText(http.StatusUnauthorized), http.StatusUnauthorized)
		return
	}

	// Add token to db
	_, err = mh.AddToken(&token)
	if err != nil {
		http.Error(w, fmt.Sprintln(err), http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(response{"Token Minted"})
}

func ListToken(w http.ResponseWriter, r *http.Request) {
	metaHash := chi.URLParam(r, "metahash")

	if metaHash == "" {
		http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
		return
	}

	list := db.List{}
	json.NewDecoder(r.Body).Decode(&list)
	list.ListingTime = time.Now()

	update := bson.M{"$set": bson.M{"listed": true}, "$push": bson.M{"listing": list}}
	filter := bson.M{"metaHash": metaHash}

	_, err := mh.UpdateToken(filter, update)
	if err != nil {
		http.Error(w, fmt.Sprintln(err), http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(response{"Token Listed"})
}

func BidOnToken(w http.ResponseWriter, r *http.Request) {
	metaHash := chi.URLParam(r, "metahash")

	if metaHash == "" {
		http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
		return
	}

	bid := db.Bid{}
	json.NewDecoder(r.Body).Decode(&bid)
	bid.TimeOfBid = time.Now()

	update := bson.M{"$push": bson.M{"bids": bid}}
	filter := bson.M{"metaHash": metaHash, "listed": true}

	_, err := mh.UpdateToken(filter, update)
	if err != nil {
		http.Error(w, fmt.Sprintln(err), http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(response{"Bid placed"})
}
