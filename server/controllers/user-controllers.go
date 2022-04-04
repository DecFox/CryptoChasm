package controllers

import (
	"encoding/hex"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"cryptochasm.com/db"
	"github.com/go-chi/chi"
	"go.mongodb.org/mongo-driver/bson"
)

type UserResponse struct {
	Status   string  `json:"status,omitempty"`
	Response db.User `json:"response,omitempty"`
	Nonce    string  `json:"nonce,omitempty"`
}

func GetByAddress(w http.ResponseWriter, r *http.Request) {
	ethAddress := chi.URLParam(r, "ethaddress")
	if ethAddress == "" {
		http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
		return
	}

	user := &db.User{}
	err := mh.GetSingleUser(user, bson.M{"ethAddress": ethAddress})
	if err != nil {
		http.Error(w, http.StatusText(404), 404)
		return
	}

	json.NewEncoder(w).Encode(user)
}

func InitialiseUser(w http.ResponseWriter, r *http.Request) {
	ethAddress := chi.URLParam(r, "ethaddress")

	if ethAddress == "" {
		http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
		return
	}

	filter := bson.M{"ethAddress": ethAddress}
	nonce, err := genNonce()

	if err != nil {
		http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
		return
	}

	_, err = mh.InitUser(filter, bson.M{"$set": bson.M{"nonce": nonce}})
	if err != nil {
		log.Println(err)
		http.Error(w, fmt.Sprintln(err), http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(
		UserResponse{
			Status: "User Initialised",
		},
	)
}

func EditUser(w http.ResponseWriter, r *http.Request) {
	ethAddress := chi.URLParam(r, "ethaddress")

	if ethAddress == "" {
		http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
		return
	}

	filter := bson.M{"ethAddress": ethAddress}
	update := db.User{}
	json.NewDecoder(r.Body).Decode(&update)

	_, err := mh.UpdateUser(filter, bson.M{"$set": update})
	if err != nil {
		http.Error(w, fmt.Sprintln(err), http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(
		UserResponse{
			Status: "User Updated",
		},
	)
}

func GetUserNonce(w http.ResponseWriter, r *http.Request) {
	ethAddress := chi.URLParam(r, "ethaddress")
	if ethAddress == "" {
		http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
		return
	}

	user := &db.User{}
	err := mh.GetSingleUser(user, bson.M{"ethAddress": ethAddress})
	if err != nil {
		http.Error(w, http.StatusText(404), 404)
		return
	}

	nonce := user.Nonce
	nonceHex := hex.EncodeToString([]byte(nonce))

	json.NewEncoder(w).Encode(
		UserResponse{
			Status: "nonce received",
			Nonce:  nonceHex,
		},
	)
}
