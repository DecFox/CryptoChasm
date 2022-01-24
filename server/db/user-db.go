package db

import (
	"context"

	"go.mongodb.org/mongo-driver/mongo"
)

func (mh *MongoHandler) GetSingleUser(user *User, filter interface{}) error {

	ctx, cancel := context.WithTimeout(context.Background(), TimeOut)
	defer cancel()

	err := userCollection.FindOne(ctx, filter).Decode(user)

	return err
}

func (mh *MongoHandler) SignUser(user *User) (*mongo.InsertOneResult, error) {

	ctx, cancel := context.WithTimeout(context.Background(), TimeOut)
	defer cancel()

	result, err := userCollection.InsertOne(ctx, user)

	return result, err
}

func (mh *MongoHandler) UpdateUser(filter interface{}, update interface{}) (*mongo.UpdateResult, error) {

	ctx, cancel := context.WithTimeout(context.Background(), TimeOut)
	defer cancel()

	result, err := userCollection.UpdateOne(ctx, filter, update)

	return result, err
}
