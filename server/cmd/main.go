package main

import (
	"log"
	"net/http"

	"cryptochasm.com/routes"
)

func main() {
	r := routes.RouterInit()
	log.Fatal(http.ListenAndServe(":5050", r))
}
