import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  public encryptionKey: string;

  constructor() { }

  // ********** FUNCTION TO GENERATE RANDOM ENCRYPTION KEY ************
  generateRandomKey(){
      var encryptionKey = CryptoJS.PBKDF2(environment.PASSWORD, environment.SALT, {
      keySize: 256 / 32,
      iterations: 65536
    })
    return encryptionKey;
  }

  // ******************** MESSAGE ENCRYPTION FUNCTION *******************
  public encryptMessage(message: string){
    var key = this.generateRandomKey();

    console.log(message)
    var messageUtf8 = CryptoJS.enc.Utf8.parse(message)

    var encryptedMessage = CryptoJS.AES.encrypt(messageUtf8, key, {
      iv: CryptoJS.enc.Utf8.parse(environment.Key_IV),
      //padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CFB
    })

    console.log(encryptedMessage)
    return encryptedMessage.ciphertext.toString(CryptoJS.enc.Base64);
  }


  // ********************** MESSAGE DECRYPTION FUNCTION *******************
  public decryptMessage(message: string){
   var key = this.generateRandomKey();

    var decryptedMessage = CryptoJS.AES.decrypt(message, key, {
      iv: CryptoJS.enc.Utf8.parse(environment.Key_IV),
      //padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CFB
    })

    return decryptedMessage.toString(CryptoJS.enc.Utf8);
  }


}
