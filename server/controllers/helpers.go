package controllers

import (
	"mime/multipart"
	"net/http"
)

type FormMultipart struct {
	File        multipart.File
	FileHead    *multipart.FileHeader
	Minter      string
	Description string
	Name        string
}

func ProcessMultipart(r *http.Request) (FormMultipart, error) {
	err := r.ParseMultipartForm(20 << 20) // max upload size 20 MB
	if err != nil {
		return FormMultipart{}, err
	}

	file, fileHead, err := r.FormFile("file")
	if err != nil {
		return FormMultipart{}, err
	}

	formData := FormMultipart{
		File:        file,
		FileHead:    fileHead,
		Minter:      r.PostFormValue("minter"),
		Description: r.PostFormValue("description"),
		Name:        r.PostFormValue("name"),
	}

	return formData, nil
}
