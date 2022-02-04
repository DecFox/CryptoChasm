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
	mh                *db.MongoHandler
	cldh              *db.CloudHandler
	pinata_key        string
	pinata_secret     string
	cld_name          string
	cld_key           string
	cld_secret        string
)

func gogdotenv(key string) string {
	err := godotenv.Load("../.env")

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	return os.Getenv(key)
}

func ControllersInit() {
	pinata_key = gogdotenv("PINATA_API_KEY")
	pinata_secret = gogdotenv("PINATA_API_SECRET")

	cld_name = gogdotenv("CLD_NAME")
	cld_key = gogdotenv("CLD_API_KEY")
	cld_secret = gogdotenv("CLD_API_SECRET")

	mongoDbConnection = gogdotenv("DB_URI")
	mh, _ = db.NewMongoHandler(mongoDbConnection)

	cldh, _ = db.NewCloudHandler(cld_name, cld_key, cld_secret)
}
