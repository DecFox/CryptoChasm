package routes

import (
	"cryptochasm.com/controllers"
	"github.com/go-chi/chi"
)

func UserRoutes(r chi.Router) {
	r.Get("/{ethaddress}", controllers.GetByAddress)
	r.Get("/nonce/{ethaddress}", controllers.GetUserNonce)
	r.Post("/edit/{ethaddress}", controllers.EditUser)
	r.Get("/init/{ethaddress}", controllers.InitialiseUser)
}
