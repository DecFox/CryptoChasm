package controllers

import (
	"mime/multipart"
	"net/http"
)

type FormMultipart struct {
	File        *multipart.FileHeader
	Minter      string
	Description string
	Name        string
}

func ProcessMultipart(r *http.Request) (FormMultipart, error) {
	formData := FormMultipart{}

	err := r.ParseMultipartForm(20 << 20) // max upload size 20 MB

	if err != nil {
		return formData, err
	}

	_, file, err := r.FormFile("file")

	if err != nil {
		return formData, err
	}

	formData.File = file
	formData.Minter = r.PostFormValue("minter")
	formData.Description = r.PostFormValue("description")
	formData.Name = r.PostFormValue("name")

	return formData, nil
}
