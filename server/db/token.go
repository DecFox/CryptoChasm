package db

import (
	"time"
)

type Bid struct {
	BidPrice  int64     `json:"bidPrice" bson:"bidPrice"`
	Bidder    string    `json:"bidder" bson:"bidder"`
	TimeOfBid time.Time `json:"timeOfBid" bson:"timeOfBid"`
}

type List struct {
	ListPrice   int64     `json:"listPrice" bson:"listPrice"`
	ListingTime time.Time `json:"listingTime" bson:"listingTime"`
}

type Token struct {
	TokenHash string    `json:"tokenHash" bson:"tokenHash"`
	Listed    bool      `json:"listed" bson:"listed"`
	Price     int64     `json:"price" bson:"price"`
	Minter    string    `json:"minter" bson:"minter,omitempty"`
	MintedOn  time.Time `json:"mintedOn" bson:"mintedOn"`
	Owners    []string  `json:"owners" bson:"owners,omitempty"`
	Royalty   []int64   `json:"royalty" bson:"royalty,omitempty"`
	Bids      []Bid     `json:"bids" bson:"bids,omitempty"`
	Listing   []List    `json:"listing" bson:"listing,omitempty"`
}
