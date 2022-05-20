# GSN with hardhat

Setup
Install dependencies.

```
yarn
```

## Compile

```
npx hardhat compile
```

## Run ganache

```
ganache
```

## Run GSN

```
npx gsn start -n http://localhost:7545
```

## Deploy

```

npx hardhat run scripts/deploy.js --network localhost

```

## Fund Paymaster

```
npx hardhat run scripts/fund.js --network localhost
```
