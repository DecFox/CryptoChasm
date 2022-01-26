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
	Minter       string    `json:"minter" bson:"minter,omitempty"`
	MintedOn     time.Time `json:"mintedOn" bson:"mintedOn"`
	Owners       []string  `json:"owners" bson:"owners,omitempty"`
	Royalty      []float64 `json:"royalty" bson:"royalty,omitempty"`
	Bids         []Bid     `json:"bids" bson:"bids,omitempty"`
	Listing      []List    `json:"listing" bson:"listing,omitempty"`
}
