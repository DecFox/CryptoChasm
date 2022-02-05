package db

// import (
// 	"bytes"
// 	"log"
// 	"mime/multipart"
// 	"path/filepath"
// 	"time"

// 	"github.com/aws/aws-sdk-go/aws"
// 	"github.com/aws/aws-sdk-go/aws/credentials"
// 	"github.com/aws/aws-sdk-go/aws/session"
// 	"github.com/aws/aws-sdk-go/service/s3"
// )

// var (
// 	s3session *session.Session
// )

// func Init() (*session.Session, error) {
// 	s3session, err := session.NewSession(&aws.Config{
// 		Region:      aws.String("eu-Central-1"),                                        // set aws region here
// 		Credentials: credentials.NewStaticCredentials("secret id", "secret token", ""), // set credentials here
// 	})

// 	if err != nil {
// 		log.Fatal(err)
// 		return nil, err
// 	}

// 	return s3session, nil
// }

// func UploadFile(file multipart.File, header *multipart.FileHeader, minter string) error {
// 	fileSize := header.Size
// 	buf := make([]byte, fileSize)
// 	file.Read(buf)

// 	fileName := "token-" + minter + "-" + time.Now().String() + filepath.Ext(header.Filename)

// 	_, err := s3.New(s3session).PutObject(&s3.PutObjectInput{
// 		Bucket: aws.String(BUCKET_NAME), // set bucket name here
// 		Key:    aws.String(fileName),
// 		ACL:    aws.String("public-read"),
// 		Body:   bytes.NewReader(buf),
// 	})

// 	if err != nil {
// 		log.Println(err)
// 		return err
// 	}

// 	return nil
// }
