import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js'
import { AsyncSubject, BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  private encryptionKey$ = new BehaviorSubject<any>(null);
  encryptionKey: Observable<any> = this.encryptionKey$.asObservable();

  private encKey: any;

  constructor() { }

  // ******************** MESSAGE ENCRYPTION FUNCTION *******************
  public encryptMessage(message: string){ 
    var key = this.encKey;
    var messageUtf8 = CryptoJS.enc.Utf8.parse(message)
    var encryptedMessage = CryptoJS.AES.encrypt(messageUtf8, key, {
      iv: CryptoJS.enc.Utf8.parse(environment.Key_IV),
      //padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CFB
    })
    return encryptedMessage.ciphertext.toString(CryptoJS.enc.Base64);
  }

  // ********************** MESSAGE DECRYPTION FUNCTION *******************
  public decryptMessage(message: string, encKey: string){
    var key = encKey;
    var decryptedMessage = CryptoJS.AES.decrypt(message, key, {
      iv: CryptoJS.enc.Utf8.parse(environment.Key_IV),
      //padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CFB
    })
    return decryptedMessage.toString(CryptoJS.enc.Utf8);
  }

  setEncryptionKey(key: any){
    this.encKey = key;
    this.encryptionKey$.next(key);
  }

}
