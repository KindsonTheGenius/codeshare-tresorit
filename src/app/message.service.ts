import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private codeToSend$ = new BehaviorSubject<string>('');
  codeToSend: Observable<string> = this.codeToSend$.asObservable();

  setCodeToSend(newValue: string){
    this.codeToSend$.next(newValue);
  }

  constructor() { }
}
