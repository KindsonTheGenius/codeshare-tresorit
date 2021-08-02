import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { EncryptionService } from '../encryption.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.css']
})
export class SenderComponent implements OnInit {

  @ViewChild('entry') entry;

  messageLink: string;

  constructor(
    private messageService: MessageService, 
    private encryptionService: EncryptionService,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.messageLink = this.encryptionService.encryptionKey;
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
    var psw = environment.PASSWORD;
    var kiv = environment.Key_IV;
    var slt = environment.SALT;
    this.messageLink = psw + '/' + kiv + '/' + slt;
    this.modalService.open(contentModal);
   }

}
