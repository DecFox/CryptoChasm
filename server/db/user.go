package db

type User struct {
	EthAddress string `json:"ethAddress" bson:"ethAddress"`
	Nonce      string `json:"nonce" bson:"nonce"`
	Username   string `json:"username,omitempty" bson:"username,omitempty"`
	Bio        string `json:"bio,omitempty" bson:"bio,omitempty"`
	Email      string `json:"email,omitempty" bson:"email,omitempty"`
	Twitter    string `json:"twitter,omitempty" bson:"twitter,omitempty"`
	Instagram  string `json:"instagram,omitempty" bson:"instagram,omitempty"`
	Other      string `json:"other,omitempty" bson:"other,omitempty"`
}

type UserNonce struct {
	EthAddress string `json:"ethAddress" bson:"ethAddress"`
	Nonce      string `json:"nonce" bson:"nonce"`
}
