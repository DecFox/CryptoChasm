package controllers

import (
	"log"
	"os"

	"cryptochasm.com/db"
	"github.com/joho/godotenv"
)

type response struct {
	Status string `json:"status"`
}

var (
	mongoDbConnection string
	mh                db.MongoHandler
	pinata_key        string
	pinata_secret     string
)

func gogdotenv(key string) string {
	err := godotenv.Load("../.env")

	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	return os.Getenv(key)
}

func ControllersInit() {
	pinata_key = gogdotenv("PINATA_API_KEY")
	pinata_secret = gogdotenv("PINATA_API_SECRET")

	mongoDbConnection = gogdotenv("DB_URI")
	mh = *db.NewHandler(mongoDbConnection)
}
