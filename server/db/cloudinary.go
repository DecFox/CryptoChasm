package db

import (
	"context"
	"log"
	"mime/multipart"
	"time"

	"github.com/cloudinary/cloudinary-go"
	"github.com/cloudinary/cloudinary-go/api/uploader"
)

type CloudHandler struct {
	name string
	sess *cloudinary.Cloudinary
}

func NewCloudHandler(cloud_name string, cloud_key string, cloud_secret string) (*CloudHandler, error) {
	cl, err := cloudinary.NewFromParams(cloud_name, cloud_key, cloud_secret)
	if err != nil {
		log.Println("failed to connect to cloudinary:", err)
		return nil, err
	}

	cldh := &CloudHandler{
		name: cloud_name,
		sess: cl,
	}

	return cldh, nil
}

func (cldh *CloudHandler) UploadToken(file multipart.File, header *multipart.FileHeader, minter string) (*uploader.UploadResult, error) {
	cldSession := cldh.sess

	fileName := "token-" + minter + "-" + time.Now().String()

	ctx, cancel := context.WithTimeout(context.Background(), TimeOut*2)
	defer cancel()

	resp, err := cldSession.Upload.Upload(ctx, file, uploader.UploadParams{PublicID: fileName})
	if err != nil {
		log.Println("failed to upload image:", err)
		return nil, err
	}

	return resp, nil
}
