import crypto from "node:crypto";

type Keypair = {
  privateKey: string;
  publicKey: string;
};
export const createKeyPair = async (passphrase: string): Promise<Keypair> => {
  try {
    const keyPair = await new Promise<Keypair>((resolve, reject) => {
      crypto.generateKeyPair(
        "rsa",
        {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: "spki",
            format: "pem",
          },
          privateKeyEncoding: {
            type: "pkcs8",
            format: "pem",
            cipher: "aes-256-cbc",
            passphrase: passphrase,
          },
        },
        (err, publicKey, privateKey) => {
          if (err) {
            reject(err);
          } else {
            resolve({ publicKey, privateKey });
          }
        }
      );
    });
    return keyPair;
  } catch (err) {
    console.error(err);
  }
};

/* //@ts-ignore
      console.log(keyPair.publicKey);
      //@ts-ignore
      console.log(keyPair.privateKey);

      const key = crypto.createPrivateKey({
        //@ts-ignore
        key: keyPair.privateKey,
        passphrase: "test",
      });

      const message = Buffer.from(
        "hey dude how are you doing hopefully you're having a good day.  I want to offer you a business opportunity and hopefully that will do it.  Have a good day my dude.  Take care. hey dude how are you doing hopefully you're having a good day.  I want to offer you a business opportunity and hopefully that will do it.  Have a good day my dude.  Take care.hey dude how are you doing hopefully you're having a good day."
      );
      //@ts-ignore
      const enc = crypto.publicEncrypt(keyPair.publicKey, message).toString("base64");
      console.log(enc);

      const dect = crypto
        //@ts-ignore
        .privateDecrypt({ key: keyPair.privateKey, passphrase: "test" }, Buffer.from(enc, "base64"))
        .toString();
      console.log(dect);
    } catch (err) {
      console.error(err);
    }
*/
