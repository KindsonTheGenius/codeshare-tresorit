import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { EncryptionService } from '../encryption.service';


@Component({
  selector: 'app-receiver',
  templateUrl: './receiver.component.html',
  styleUrls: ['./receiver.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReceiverComponent implements OnInit {

  receivedCode:string;
  destroyer$: Subject<void> = new Subject();


  constructor(
    private messageService: MessageService,
    private cdr: ChangeDetectorRef,
    private encryptionService: EncryptionService
  ) { 
    window.addEventListener('storage', this.storageEventHandler, true);
  }

  ngOnInit(): void {
    this.messageService.codeToSend.pipe(takeUntil(this.destroyer$)).subscribe(data => {
      this.receivedCode = data;
    });
  }

  storageEventHandler = (event: StorageEvent) => {

    const decryptedMessage = this.encryptionService.decryptMessage(event.newValue)

    this.receivedCode = decryptedMessage;
    this.cdr.detectChanges();
  }
    
}
