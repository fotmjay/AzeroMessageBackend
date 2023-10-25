import { decodeAddress, encodeAddress } from "@polkadot/keyring";
import { hexToU8a, isHex, u8aToHex } from "@polkadot/util";
import { cryptoWaitReady, signatureVerify } from "@polkadot/util-crypto";

export const addressFormatValidation = (address: string): boolean => {
  const isValidAddressPolkadotAddress = () => {
    try {
      encodeAddress(isHex(address) ? hexToU8a(address) : decodeAddress(address));
      return true;
    } catch (error) {
      return false;
    }
  };
  const isValid = isValidAddressPolkadotAddress();
  return isValid;
};

export const validateSignature = async (signedMessage: string, signature: string, publicAddress: string) => {
  //Some interfaces, such as using sr25519 however are only available via WASM
  await cryptoWaitReady();
  const isValid = isValidSignature(signedMessage, signature, publicAddress);
  return isValid;
};

const isValidSignature = (signedMessage, signature, address) => {
  let valid = false;
  try {
    const publicKey = decodeAddress(address);
    const hexPublicKey = u8aToHex(publicKey);
    valid = signatureVerify(signedMessage, signature, hexPublicKey).isValid;
  } catch (err) {
    return false;
  }
  return valid;
};
