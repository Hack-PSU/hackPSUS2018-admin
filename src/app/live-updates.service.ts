import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LiveUpdatesService {
  private url =  'http://localhost:5000/';
  private socket;

  constructor() { }

  getUpdates() {
    return new Observable((observer) => {
      this.socket = io(this.url, { path: '/v1/live' });
      this.socket.open();
      this.socket.on('connect', () => {
        console.log('CONNECTED');
      });

      this.socket.on('disconnect', () => {
        console.log('DISCONNECTED');
      });
      this.socket.on('update', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  sendMessage(message: string) {
    this.socket.emit('update', message);
  }
}
