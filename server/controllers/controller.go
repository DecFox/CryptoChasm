package controllers

import (
	"log"
	"os"

	"cryptochasm.com/db"
	"github.com/joho/godotenv"
)

type Response struct {
	Status string `json:"status"`
}

var (
	mh                *db.MongoHandler
	s3b               *db.S3Bucket
	mongoDbConnection string
	pinata_key        string
	pinata_secret     string
	aws_region        string
	aws_key           string
	aws_secret        string
	s3_bucket         string
)

func Dotenv(key string) string {
	err := godotenv.Load("../.env")

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	return os.Getenv(key)
}

func ControllersInit() {
	pinata_key = Dotenv("PINATA_API_KEY")
	pinata_secret = Dotenv("PINATA_API_SECRET")

	aws_region = Dotenv("AWS_REGION")
	aws_key = Dotenv("AWS_ACCESS_KEY")
	aws_secret = Dotenv("AWS_ACCESS_SECRET")
	s3_bucket = Dotenv("TOKEN_BUCKET_NAME")
	s3b, _ = db.NewS3Session(aws_region, aws_key, aws_secret, s3_bucket)

	mongoDbConnection = Dotenv("DB_URI")
	mh, _ = db.NewMongoHandler(mongoDbConnection)
}
