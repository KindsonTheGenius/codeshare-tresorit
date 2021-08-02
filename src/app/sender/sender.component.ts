import { Component, OnInit, ViewChild } from '@angular/core';
import { EncryptionService } from '../encryption.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.css']
})
export class SenderComponent implements OnInit {

  @ViewChild('entry') entry;

  constructor(private messageService: MessageService, private encryptionService: EncryptionService) { }

  ngOnInit(): void {
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

}
