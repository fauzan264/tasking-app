package handler

import (
	"html/template"
	"log"
	"net/http"
	"path"
)

// layout template
var viewLayout string = path.Join("views", "layout.html")

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.NotFound(w, r)
		return
	}

	temp, err := template.ParseFiles(path.Join("views", "list.html"), viewLayout)

	if err != nil {
		log.Println(err)
		http.Error(w, "Error: page not found", http.StatusInternalServerError)
		return
	}

	data := map[string]interface{}{
		"title":   "List",
		"content": "List Data",
	}

	err = temp.Execute(w, data)
	if err != nil {
		log.Println(err)
		http.Error(w, "Error: page not found", http.StatusInternalServerError)
		return
	}
}

func FormHandler(w http.ResponseWriter, r *http.Request) {
	temp, err := template.ParseFiles(path.Join("views", "form.html"), viewLayout)

	if err != nil {
		log.Println(err)
		http.Error(w, "Error: page not found", http.StatusInternalServerError)
		return
	}

	data := map[string]interface{}{
		"title":   "Form",
		"content": "Form Task",
	}

	err = temp.Execute(w, data)
	if err != nil {
		log.Println(err)
		http.Error(w, "Error: page not found", http.StatusInternalServerError)
		return
	}
}

func DetailHandler(w http.ResponseWriter, r *http.Request) {
	temp, err := template.ParseFiles(path.Join("views", "detail.html"), viewLayout)

	if err != nil {
		log.Println(err)
		http.Error(w, "Error: page not found", http.StatusInternalServerError)
		return
	}

	data := map[string]interface{}{
		"title":   "Detail",
		"content": "Detail Task",
	}

	err = temp.Execute(w, data)
	if err != nil {
		log.Println(err)
		http.Error(w, "Error: page not found", http.StatusInternalServerError)
		return
	}
}
