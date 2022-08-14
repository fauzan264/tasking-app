package handler

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"path"
	"tasking-app/entity"
)

// layout template
var viewLayout string = path.Join("views", "layout.html")

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	// url
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

	// data
	response, err := http.Get("http://localhost:8080/api/v1/tasks")
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	}

	responseData, err := ioutil.ReadAll(response.Body)
	if err != nil {
		log.Fatal(err)
	}

	var responseObject entity.Response
	json.Unmarshal(responseData, &responseObject)

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
