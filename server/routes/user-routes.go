package routes

import (
	"cryptochasm.com/controllers"
	"github.com/go-chi/chi"
)

func UserRoutes(r chi.Router) {
	r.Get("/{ethaddress}", controllers.GetByAddress)
	r.Post("/", controllers.SignupUser)
	r.Post("/edit/{ethaddress}", controllers.EditUser)
}
