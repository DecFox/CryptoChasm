package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"cryptochasm.com/db"
	"github.com/go-chi/chi"
	"go.mongodb.org/mongo-driver/bson"
)

func GetAllTokens(w http.ResponseWriter, r *http.Request) {
	tokens := mh.GetTokens(bson.M{})
	json.NewEncoder(w).Encode(tokens)
}

func GetByHash(w http.ResponseWriter, r *http.Request) {

	tokenHash := chi.URLParam(r, "tokenhash")

	if tokenHash == "" {
		http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
		return
	}

	token := &db.Token{}
	err := mh.GetSingleToken(token, bson.M{"tokenHash": tokenHash})

	if err != nil {
		http.Error(w, http.StatusText(404), 404)
		return
	}

	json.NewEncoder(w).Encode(token)
}

func MintToken(w http.ResponseWriter, r *http.Request) {

	PresentToken := &db.Token{}
	token := db.Token{}
	json.NewDecoder(r.Body).Decode(&token)

	token.MintedOn = time.Now()

	err := mh.GetSingleToken(PresentToken, bson.M{"tokenHash": token.TokenHash})

	if err == nil {
		http.Error(w, http.StatusText(http.StatusUnauthorized), http.StatusUnauthorized)
		return
	}

	_, err = mh.AddToken(&token)

	if err != nil {
		http.Error(w, fmt.Sprintln(err), http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(response{"Token Minted"})
}

func ListToken(w http.ResponseWriter, r *http.Request) {

	tokenHash := chi.URLParam(r, "tokenhash")

	if tokenHash == "" {
		http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
		return
	}

	list := db.List{}
	json.NewDecoder(r.Body).Decode(&list)
	list.ListingTime = time.Now()

	update := bson.M{"$set": bson.M{"listed": true}, "$push": bson.M{"listing": list}}
	filter := bson.M{"tokenHash": tokenHash}

	_, err := mh.UpdateToken(filter, update)

	if err != nil {
		http.Error(w, fmt.Sprintln(err), http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(response{"Token Listed"})
}

func BidOnToken(w http.ResponseWriter, r *http.Request) {

	tokenHash := chi.URLParam(r, "tokenhash")

	if tokenHash == "" {
		http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
		return
	}

	bid := db.Bid{}
	json.NewDecoder(r.Body).Decode(&bid)
	bid.TimeOfBid = time.Now()

	update := bson.M{"$push": bson.M{"bids": bid}}
	filter := bson.M{"tokenHash": tokenHash, "listed": true}

	_, err := mh.UpdateToken(filter, update)

	if err != nil {
		http.Error(w, fmt.Sprintln(err), http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(response{"Bid placed"})
}
