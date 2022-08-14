package entity

import (
	"github.com/google/uuid"
)

type Response struct {
	Meta Meta   `json:"meta"`
	Data []Data `json:"data"`
}

type Meta struct {
	Message string `json:"message"`
	Code    int    `json:"code"`
	Status  string `json:"status"`
}

type Data struct {
	Id       uuid.UUID `json:"id"`
	Task     string    `json:"task"`
	Assign   string    `json:"assign"`
	Status   int       `json:"status"`
	Deadline string    `json:"deadline"`
}
