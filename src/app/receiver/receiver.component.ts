import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { EncryptionService } from '../encryption.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js'


@Component({
  selector: 'app-receiver',
  templateUrl: './receiver.component.html',
  styleUrls: ['./receiver.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReceiverComponent implements OnInit {

  receivedCode:string;
  destroyer$: Subject<void> = new Subject();

  encryptionKey: any;
  salt: string;

  constructor(
    private messageService: MessageService,
    private cdr: ChangeDetectorRef,
    private encryptionService: EncryptionService,
    private route: ActivatedRoute
  ) { 
    window.addEventListener('storage', this.storageEventHandler, true);
  }

    // ********** FUNCTION TO GENERATE RANDOM ENCRYPTION KEY ************
   generateRandomKey(salt: string){
      var encryptionKey = CryptoJS.PBKDF2(environment.PASSWORD, salt, {
      keySize: 256 / 32,
      iterations: 65536
    })
    return encryptionKey;
  }

  ngOnInit(): void {  

    this.salt = this.route.snapshot.params['salt']
    this.messageService.codeToSend.pipe(takeUntil(this.destroyer$)).subscribe(data => {
      this.receivedCode = data;
    });

    this.encryptionKey = this.generateRandomKey(this.salt)
  }

  storageEventHandler = (event: StorageEvent) => {
    const decryptedMessage = this.encryptionService.decryptMessage(event.newValue, this.encryptionKey)
    this.receivedCode = decryptedMessage;
    this.cdr.detectChanges();
  }
    
}
