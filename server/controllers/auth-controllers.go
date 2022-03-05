package controllers

import (
	"crypto/rand"
	"encoding/json"
	"fmt"
	"log"
	"math/big"
	"net/http"
	"strconv"
	"strings"

	"cryptochasm.com/db"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/go-chi/chi"
	"go.mongodb.org/mongo-driver/bson"
)

type AuthSign struct {
	Signature string `json:"signature,omitempty"`
}

type AuthResponse struct {
	EthAddress string `json:"ethAddress"`
	Status     string `json:"status"`
}

func genNonce(ethAddress string) (db.User, error) {
	result := db.User{}

	randNonce, err := rand.Int(rand.Reader, big.NewInt(100000))
	if err != nil {
		return result, err
	}

	nonce := int(randNonce.Int64())

	filter := bson.M{"ethAddress": ethAddress}
	updateResult, err := mh.UpdateUser(filter, bson.M{"$set": bson.M{"nonce": strconv.Itoa(nonce)}})
	if err != nil {
		return result, err
	}

	err = updateResult.Decode(&result)
	if err != nil {
		return result, err
	}

	return result, nil
}

func VerifySignature(w http.ResponseWriter, r *http.Request) {
	ethAddress := chi.URLParam(r, "ethaddress")

	authSignature := AuthSign{}
	json.NewDecoder(r.Body).Decode(&authSignature)

	sigByte := hexutil.MustDecode(authSignature.Signature)
	if sigByte[64] != 27 && sigByte[64] != 28 {
		http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
		return
	}
	sigByte[64] -= 27

	data, err := genNonce(ethAddress)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
		return
	}

	message := fmt.Sprintf("\x19Ethereum Signed Message:\n%d%s", len(data.Nonce), data.Nonce)
	publicKey, err := crypto.SigToPub(crypto.Keccak256([]byte(message)), sigByte)
	if err != nil {
		log.Println(err)
		http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
		return
	}

	derivedAddress := crypto.PubkeyToAddress(*publicKey).String()
	pubAddress := strings.ToLower(derivedAddress)

	if pubAddress == ethAddress {
		json.NewEncoder(w).Encode(
			AuthResponse{
				EthAddress: ethAddress,
				Status:     "success",
			},
		)
		return
	}

	json.NewEncoder(w).Encode(
		AuthResponse{
			EthAddress: ethAddress,
			Status:     "failed",
		},
	)
}
