import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js'

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  Key_IV = "79994A6EF73DA76C";
  PASSWORD = "EF737CC29DAE7C80644A5B01544CBA61";
  SALT = "12345";

  secretKey = "YourSecretKeyForEncryption&Descryption";

  constructor() { }

  encoder(str) {
    let encoder = new TextEncoder();
    let byteArray = encoder.encode(str)
    return CryptoJS.enc.Utf8.parse(str)
  }

  toWordArray(str) {
    return CryptoJS.enc.Utf8.parse(str);
  }

  public encryptMessage(message: string){
    var key = CryptoJS.PBKDF2(this.PASSWORD, this.SALT, {
      keySize: 256 / 32,
      iterations: 65536
    })
    console.log(key)
    var encryptedMessage = CryptoJS.AES.encrypt(this.encoder(message), key, {
      iv: this.toWordArray(this.Key_IV),
     // padding: CryptoJS.pad.Pkcs7, // in case padding is needed
      mode: CryptoJS.mode.CFB
    })
    return encryptedMessage.ciphertext.toString(CryptoJS.enc.Base64);
  }

  public decryptMessage(message: string){

   var key = CryptoJS.PBKDF2(this.PASSWORD, this.SALT, {
      keySize: 256 / 32,
      iterations: 65536
    })
    console.log(key)
    var decryptedMessage = CryptoJS.AES.decrypt(message, key, {
      iv: this.toWordArray(this.Key_IV),
     // padding: CryptoJS.pad.Pkcs7, //in case padding is needed
      mode: CryptoJS.mode.CFB
    })
    return decryptedMessage.toString(CryptoJS.enc.Utf8);
  }
}
