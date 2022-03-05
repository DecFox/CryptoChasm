package routes

import (
	"cryptochasm.com/controllers"
	"github.com/go-chi/chi"
)

func AuthRoutes(r chi.Router) {
	r.Post("/{ethaddress}", controllers.VerifySignature)
}
