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

### Issues When Cloning

- Database only fetches the last 100 interactions with the smart-contract. If the smart-contract has been used a lot without database update (or if you are catching up from a new database), it will necessitate a change in code.
- Database also only fetches the current smart-contract, which means anytime the contract address changes, a manual update of the transactions passed to the old contract will be necessary.
