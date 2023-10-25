# Azero Message

**Please view the readme in the front-end part for a full installation guide.**

Azero Message is an app that runs on top of the Aleph Zero blockchain. It consists of 3 parts: [front-end](https://github.com/fotmjay/AzeroMessage) (TypeScript React), [back-end](https://github.com/fotmjay/AzeroMessageBackend) (TypeScript) and [smart-contract](https://github.com/fotmjay/AzeroMessageSC) (ink!).

The app allows to message any address (or AzeroID domain) on the blockchain through the use of a smart-contract. The event is emitted and the message is saved in the blockchain. It is then picked up by an indexer and placed inside a database. Retrieving messages going to (or leaving from) an address is as simple as searching the address.

The app also allows the creation of asymetric key pairs to allow encryption of messages using someone's generated public key, which can only be decrypted by their associated private key. The asymetric keypair is separate from the crypto wallet's of the user (view Appendix for more details).

## Backend

```
git clone https://github.com/fotmjay/AzeroMessageBackend
cd AzeroMessageBackend
npm install
```

The database is currently hosted on MongoDB (NoSQL). The .env file will be missing when you clone the repo.

Create it in `./src/config/.env`:

```
DB_STRING=YOUR_MONGODB_STRING_HERE
SUBSCAN_API_KEY=YOUR_SUBSCAN_API_KEY_HERE
```

If you redeployed the smart-contract, you will also need to update the contract address in `./src/constants/constants.ts`.

Once done, use: `npm run dev`.

# API COMMANDS

Server listens on 3 routes:

```
/
/api
/auth
```

## Root Route

- `get /docs`
  Returns links to this readme.

- `get /**`
  Generic 404.

## /Api Route

Replace :target with `sender` or `receiver`. Replace :address by the address you want to query.

- `get api/messages/:target/:address`

return example:

```
{
    "success": true,
    "data": [
        {
            "_id": "6538349b6ad512a7f995b35f",
            "from": "5EKvkseQeKS92c5kHcQZg1ckpSoDPaPa8pYmftGBeSpJm6iN",
            "to": "5E58JFJTGkhFaT8xdugxyz2zSNmdGfZMaMFbKCu8xQZThE9M",
            "text": "da54ce956ca64e7cbe5619bee03ebe58ed0d6b0994c68de71fbdc230f565eb75f026c4e098fff63b81141e3400a68dc29204d3e22a7b",
            "timestamp": 1698182289,
            "explorerLink": "https://alephzero.subscan.io/extrinsic/61507224-1",
            "encrypted": true,
            "__v": 0
        },
    ]
}
```

Return encryption key from database.

- `get api/publickey/:address`

return example for **encryption-enabled** account:

```
{
    "success": true,
    "message": "Encryption enabled on target account, public key sent.",
    "publicKey": "98c94ed2c73a5dc2df8d827eea4394a68a2b7d311ccf949585245d657851e159"
}
```

return example for **encryption-not-enabled** account:

```
{
    "success": false,
    "error": "The owner has not yet activated encryption on this address."
}
```

## /auth Route

Get random nonce (message to sign) to prove ownership with signature. Necessary before using the 2 other /auth routes. Replace :address with the address you need the nonce from.

- `get auth/getNonce/:address`

example return

```
{
    "success": true,
    "randomNonce": "762339179"
}
```

Query the encryption key pair for the currently used wallet. Query the nonce and then sign it with the wallet.
`post auth/confirmWallet`

Post options:

```
{
    "signature": "0x5c97d9f31a8322a5605f0d28b63a82fdf7dsadasdaaa31835c1a51740231acbe3c5e04e1660a6f37228ab04b86ca862b8e",
    "walletAddress": "5E58JFJTGkhFaT8xdugxyz2zSNmdGfZMaMFASwdsWZThE6M"
}
```

example return

```
{
    "success": true,
    "hasKey": true,
    "encryptedPrivateKey": "6c88923432b93485dee3c14cc5b7790c130b49d75011c0b63e6b850b184de0d9a2a8334499ecc6376e6f1c9fe366cb8e55838938f23b17221d680fe274c6e4dea5021fc8ac1c6775af5c3c95ef",
    "publicKey": "98342fdsfds323a68a2b7d311ccf949585245d657851e159",
    "message": "Successfully confirmed ownership, encrypted key sent."
}
```

Used to SET encrypted private key (enable encryption or change password) with a fresh password. It requires client-side cryptography to send password-protected private key along with public key to database.

`post auth/setPassword`

**NO CRYPTOGRAPHY VALIDATION MADE ON DATABASE, ALL UP TO CLIENT**

publicKey is the key used to ENCRYPT messages.
encryptedPrivateKey is the key to decrypt using a password to get the private key to decrypt messages.

Post options:

```
{
    "encryptedPrivateKey": "6c889122117eb14abdsad5dee3c14cc5b7790c130b49321asd184de0d9a2a8334499ec321asda2123dsa8938f23b17221d6sda3241sadasda31a5021fc8ac1c6775af5c3c95ef",
    "publicKey": "98c94ed2c7231asd34d827eedsadacxaa7d311ccf949585245d657851e159",
    "signature": "0x5c97d9f31a8322a5605f0d28b63a82fdf7dsadasdaaa31835c1a51740231acbe3c5e04e1660a6f37228ab04b86ca862b8e",
    "walletAddress": "5E58JFJTGkhFaT8xdugxyz2zSNmdGfZMaMFASwdsWZThE6M"
}
```

example return:

```
{
    "success": true,
    "hasKey": true,
    "encryptedPrivateKey": "6c889122117eb14abdsad5dee3c14cc5b7790c130b49321asd184de0d9a2a8334499ec321asda2123dsa8938f23b17221d6sda3241sadasda31a5021fc8ac1c6775af5c3c95ef",
    "publicKey": "98c94ed2c7231asd34d827eedsadacxaa7d311ccf949585245d657851e159",
    "message": "Successfully confirmed ownership, encrypted private key saved.",
}
```

### Issues When Cloning

- Database only fetches the last 100 interactions with the smart-contract. If the smart-contract has been used a lot without database update (or if you are catching up from a new database), it will necessitate a change in code.
- Database also only fetches the current smart-contract, which means anytime the contract address changes, a manual update of the transactions passed to the old contract will be necessary.
