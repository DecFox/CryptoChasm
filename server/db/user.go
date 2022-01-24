package db

type User struct {
	EthAddress string `json:"ethAddress" bson:"ethAddress,omitempty"`
	Username   string `json:"username" bson:"username,omitempty"`
	Bio        string `json:"bio" bson:"bio,omitempty"`
	Email      string `json:"email" bson:"email,omitempty"`
	Twitter    string `json:"twitter" bson:"twitter,omitempty"`
	Instagram  string `json:"instagram" bson:"instagram,omitempty"`
	Other      string `json:"other" bson:"other,omitempty"`
}
