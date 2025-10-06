// 代码生成时间: 2025-10-07 02:22:30
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Service for handling home-school communication
@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private apiServerUrl = 'https://example.com/api/'; // Replace with your actual API server URL

  constructor(private http: HttpClient) {}

  // Function to send a message from home to school
  sendMessage(homeId: string, message: string): Observable<any> {
    return this.http.post(`${this.apiServerUrl}messages`, { homeId, message })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Function to retrieve messages
  getMessages(homeId: string): Observable<any> {
    return this.http.get(`${this.apiServerUrl}messages/${homeId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Private function to handle errors
  private handleError(error: any) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      errorMessage = `Server returned code ${error.status} with body: ${error.error}`;
    }
    return throwError(errorMessage);
  }
}

// Ionic Page for home-school communication tool
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommunicationService } from './home_school_communication_tool.service';

@IonicPage()
@Component({
  selector: 'page-home-school-communication',
  templateUrl: 'home-school-communication.html',
})
export class HomeSchoolCommunicationPage {

  homeId: string;
  messages: any[] = [];
  newMessage: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private communicationService: CommunicationService) {
    this.homeId = this.navParams.get('homeId');
    this.loadMessages();
  }

  // Function to load messages
  loadMessages() {
    this.communicationService.getMessages(this.homeId).subscribe(
      data => {
        this.messages = data;
      },
      error => {
        console.error('Error fetching messages', error);
      }
    );
  }

  // Function to send a new message
  sendMessage() {
    this.communicationService.sendMessage(this.homeId, this.newMessage).subscribe(
      data => {
        this.messages.push(data);
        this.newMessage = '';
      },
      error => {
        console.error('Error sending message', error);
      }
    );
  }
}

// Template for the Ionic page
// home-school-communication.html
<ion-header>
  <ion-navbar>
    <ion-title>
      Home-School Communication
    </ion-title>
  </ion-navbar>
</ion-header>

<ion-content>
  <ion-list>
    <ion-item *ngFor="let message of messages">
      {{ message.text }}
    </ion-item>
  </ion-list>

  <ion-footer>
    <ion-item>
      <ion-input [(ngModel)]='newMessage' placeholder='Type a message...'></ion-input>
      <ion-button (click)='sendMessage()'>Send</ion-button>
    </ion-item>
  </ion-footer>
</ion-content>