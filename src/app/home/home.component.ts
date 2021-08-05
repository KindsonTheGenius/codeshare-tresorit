import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router
    ) { }

  public encryptionKey: any

  ngOnInit(): void {
  }

  shareNow(){
    
    this.router.navigate(["/sender"])
  }

}
