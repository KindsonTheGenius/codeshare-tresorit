import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { skip, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EncryptionService } from '../encryption.service.js';
import { MessageService } from '../message.service';
import * as CryptoJS from 'crypto-js'

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.css']
})
export class SenderComponent implements OnInit {

  @ViewChild('entry') entry;

  salt:string;
  messageLink: string;

  constructor(
    private messageService: MessageService, 
    private encryptionService: EncryptionService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {   
    this.salt = '12345';
    this.messageLink = "http://localhost:4200/receiver/"+ this.salt
    var encryptionKey = this.generateRandomKey(this.salt)
    this.encryptionService.setEncryptionKey(encryptionKey)
    console.log(JSON.stringify(encryptionKey))
  }

  // ********** FUNCTION TO GENERATE RANDOM ENCRYPTION KEY ************
  generateRandomKey(salt: string){
      var encryptionKey = CryptoJS.PBKDF2(environment.PASSWORD, salt, {
      keySize: 256 / 32,
      iterations: 65536
    })
    return encryptionKey;
  }

  setValue(value:string){
    const encryptedMessage = this.encryptionService.encryptMessage(value);
    localStorage.setItem("codeToSend", encryptedMessage);
    this.messageService.setCodeToSend(encryptedMessage);
  }

  clear(){
    this.entry.nativeElement.value= '';
    localStorage.setItem("codeToSend", '');
    this.messageService.setCodeToSend('');
  }

  openModal(contentModal) {
    this.modalService.open(contentModal);
  }

}
