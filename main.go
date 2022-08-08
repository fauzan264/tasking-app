package main

import (
	"log"
	"net/http"
	"tasking-app/handler"
)

func main() {
	mux := http.NewServeMux()
	
	// route
	mux.HandleFunc("/", handler.HomeHandler)

	// assets
	fileServer := http.FileServer(http.Dir("assets"))
	mux.Handle("/static/", http.StripPrefix("/static", fileServer))

	log.Println("Starting web on port 8100")
	err := http.ListenAndServe(":8100", mux)
	log.Fatal(err)
}