package db

import (
	"context"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func (mh *MongoHandler) InitUser(filter interface{}, update interface{}) (*mongo.SingleResult, error) {
	upsert := true
	opts := options.FindOneAndUpdateOptions{
		Upsert: &upsert,
	}

	ctx, cancel := context.WithTimeout(context.Background(), TimeOut)
	defer cancel()

	result := userCollection.FindOneAndUpdate(ctx, filter, update, &opts)
	if result.Err() != nil {
		return nil, result.Err()
	}

	return result, nil
}

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

func (mh *MongoHandler) UpdateUser(filter interface{}, update interface{}) (*mongo.SingleResult, error) {
	ctx, cancel := context.WithTimeout(context.Background(), TimeOut)
	defer cancel()

	result := userCollection.FindOneAndUpdate(ctx, filter, update)
	if result.Err() != nil {
		return nil, result.Err()
	}

	return result, nil
}
