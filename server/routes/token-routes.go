package routes

import (
	"cryptochasm.com/controllers"
	"github.com/go-chi/chi"
)

func TokenRoutes(r chi.Router) {
	r.Get("/all", controllers.GetAllTokens)
	r.Get("/{tokenhash}", controllers.GetByHash)
	r.Post("/", controllers.MintToken)
	r.Post("/bid/{tokenhash}", controllers.BidOnToken)
	r.Post("/list/{tokenhash}", controllers.ListToken)
}
