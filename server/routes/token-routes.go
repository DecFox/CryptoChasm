package routes

import (
	"cryptochasm.com/controllers"
	"github.com/go-chi/chi"
)

func TokenRoutes(r chi.Router) {
	r.Get("/all", controllers.GetAllTokens)
	r.Get("/{metahash}", controllers.GetByHash)
	r.Post("/", controllers.MintToken)
	r.Post("/bid/{metahash}", controllers.BidOnToken)
	r.Post("/list/{metahash}", controllers.ListToken)
}
