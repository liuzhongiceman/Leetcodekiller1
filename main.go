package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/bson"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	// See http://golang.org/pkg/time/#Parse
	timeFormat = "2006-01-02 15:04 MST"
)

type Problem struct {
	ID         primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Number     string             `json:"number" binding:"required bson:"number" binding:"required`
	Difficulty string             `json:"difficulty" binding:"required bson:"difficulty" binding:"required"`
	Date       string             `json:"date" binding:"required" bson:"date" binding:"required"`
	Method     string             `json:"method" binding:"required" bson:"method" binding:"required"`
	Round      int                `json:"round" binding:"required" bson:"round" binding:"required"`
	Link       string             `json:"link,omitempty" bson:"link,omitempty"`
}

type Rule struct {
	ID         primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Rule1     string                `json:"rule1,omitempty" bson:"rule1,omitempty"`
	Rule2     string                 `json:"rule2,omitempty" bson:"rule2,omitempty"`	
	Rule3    string                 `json:"rule3,omitempty" bson:"rule3,omitempty"`
	Rule4     string                 `json:"rule4,omitempty" bson:"rule4,omitempty"`	
	Rule5     string                 `json:"rule5,omitempty" bson:"rule5,omitempty"`
	Rule6     string                 `json:"rule6,omitempty" bson:"rule6,omitempty"`	
	Rule7     string                 `json:"rule7,omitempty" bson:"rule7,omitempty"`
	Rule8     string                 `json:"rule8,omitempty" bson:"rule8,omitempty"`	
}

var client *mongo.Client

func CreateRule(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("content-type", "application/json")
	var rule Rule
	_ = json.NewDecoder(request.Body).Decode(&rule)
	collection := client.Database("leetcodekiller").Collection("rules")
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	result, _ := collection.InsertOne(ctx, rule)
	json.NewEncoder(response).Encode(result)
}

func GetRules(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("content-type", "application/json")
	var rules []Rule
	collection := client.Database("leetcodekiller").Collection("rules")
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)
	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{ "message": "` + err.Error() + `" }`))
		return
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var rule Rule
		cursor.Decode(&rule)
		rules = append(rules, rule)
	}
	if err := cursor.Err(); err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{ "message": "` + err.Error() + `" }`))
		return
	}	
	lastRule := rules[len(rules)-1]
	json.NewEncoder(response).Encode(lastRule)
}


func CreateProblem(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("content-type", "application/json")
	var problem Problem
	_ = json.NewDecoder(request.Body).Decode(&problem)
	collection := client.Database("leetcodekiller").Collection("problems")
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	result, _ := collection.InsertOne(ctx, problem)
	json.NewEncoder(response).Encode(result)
}

func UpdateProblem(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("content-type", "application/json")
	var problem Problem
	_ = json.NewDecoder(request.Body).Decode(&problem)
	collection := client.Database("leetcodekiller").Collection("problems")
	filter := bson.M{"number": bson.M{"$eq": problem.Number}}
	update := bson.M{"$set": bson.M{"round": problem.Round, "method":problem.Method,"difficulty":problem.Difficulty,"date":problem.Date}}

	updateResult, err := collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		fmt.Println("UpdateOne() result ERROR:", err)
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{ "message": "` + err.Error() + `" }`))
		return
	}
	fmt.Println("UpdateOne() result:", updateResult)

}

func GetSolvedProblems(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("content-type", "application/json")
	var problems []Problem
	collection := client.Database("leetcodekiller").Collection("problems")
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)
	currentTime := time.Now()
	date := currentTime.Format("2006-01-02")
	cursor, err := collection.Find(ctx, bson.M{"date": date})
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{ "message": "` + err.Error() + `" }`))
		return
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var problem Problem
		cursor.Decode(&problem)
		problems = append(problems, problem)
	}
	if err := cursor.Err(); err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{ "message": "` + err.Error() + `" }`))
		return
	}
	json.NewEncoder(response).Encode(problems)
}

func FindOneProblem(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("content-type", "application/json")
	params := mux.Vars(request)
	id, _ := primitive.ObjectIDFromHex(params["id"])
	var problem Problem
	collection := client.Database("leetcodekiller").Collection("problems")
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)
	err := collection.FindOne(ctx, Problem{ID: id}).Decode(&problem)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{ "message": "` + err.Error() + `" }`))
		return
	}
	json.NewEncoder(response).Encode(problem)
}

func DeleteOneProblem(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("content-type", "application/json")
	params := mux.Vars(request)
	id, _ := primitive.ObjectIDFromHex(params["id"])
	collection := client.Database("leetcodekiller").Collection("problems")
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)
	_, err := collection.DeleteOne(ctx, bson.M{"_id": id})
	fmt.Println("_id", id)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{ "message": "` + err.Error() + `" }`))
		return
	}
}

func GetAllProblems(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("content-type", "application/json")
	var problems []Problem
	collection := client.Database("leetcodekiller").Collection("problems")
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)
	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{ "message": "` + err.Error() + `" }`))
		return
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var problem Problem
		cursor.Decode(&problem)
		problems = append(problems, problem)
	}
	if err := cursor.Err(); err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{ "message": "` + err.Error() + `" }`))
		return
	}
	json.NewEncoder(response).Encode(problems)
}

func main() {
	fmt.Println("Starting the leetcodekiller...")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
	client, _ = mongo.Connect(ctx, clientOptions)
	router := mux.NewRouter()
	
	router.HandleFunc("/api/createRule", CreateRule).Methods("POST")
	router.HandleFunc("/api/getRules", GetRules).Methods("GET")

	router.HandleFunc("/api/createProblem", CreateProblem).Methods("POST")
	router.HandleFunc("/api/updateProblem", UpdateProblem).Methods("PUT")
	router.HandleFunc("/api/getSolvedProblems", GetSolvedProblems).Methods("GET")
	router.HandleFunc("/api/findOneProblem/{id}", FindOneProblem).Methods("GET")
	router.HandleFunc("/api/deleteOneProblem/{id}", DeleteOneProblem).Methods("DELETE")
	router.HandleFunc("/api/getAllProblems", GetAllProblems).Methods("GET")
	http.ListenAndServe(":12345", router)
}
