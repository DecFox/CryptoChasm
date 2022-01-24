package routes

import (
	"net/http"

	"cryptochasm.com/controllers"
	"github.com/go-chi/chi"
)

func RouterInit() http.Handler {

	controllers.ControllersInit()

	r := chi.NewRouter()
	r.Route("/token", TokenRoutes)
	r.Route("/user", UserRoutes)
	return r
}
