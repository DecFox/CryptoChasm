package db

import (
	"time"
)

type Bid struct {
	BidPrice  float64   `json:"bidPrice" bson:"bidPrice"`
	Bidder    string    `json:"bidder" bson:"bidder"`
	TimeOfBid time.Time `json:"timeOfBid" bson:"timeOfBid"`
}

type List struct {
	ListPrice   float64   `json:"listPrice" bson:"listPrice"`
	ListingTime time.Time `json:"listingTime" bson:"listingTime"`
}

type Token struct {
	MetaHash     string    `json:"metaHash" bson:"metaHash"`
	TokenGateway string    `json:"tokenGateway" bson:"tokenGateway"`
	Listed       bool      `json:"listed" bson:"listed"`
	Minter       string    `json:"minter,omitempty" bson:"minter,omitempty"`
	MintedOn     time.Time `json:"mintedOn" bson:"mintedOn"`
	Name         string    `json:"name" bson:"name"`
	Description  string    `json:"description" bson:"description"`
	Owners       []string  `json:"owners,omitempty" bson:"owners,omitempty"`
	Royalty      []float64 `json:"royalty,omitempty" bson:"royalty,omitempty"`
	Bids         []Bid     `json:"bids,omitempty" bson:"bids,omitempty"`
	Listing      []List    `json:"listing,omitempty" bson:"listing,omitempty"`
}
