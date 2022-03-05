package routes

import (
	"net/http"

	"cryptochasm.com/controllers"
	"github.com/go-chi/chi"
	"github.com/rs/cors"
)

func RouterInit() http.Handler {
	controllers.ControllersInit()

	r := chi.NewRouter()
	r.Use(cors.Default().Handler)

	r.Route("/auth", AuthRoutes)
	r.Route("/token", TokenRoutes)
	r.Route("/user", UserRoutes)

	return r
}
