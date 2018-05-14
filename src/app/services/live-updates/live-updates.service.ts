import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import * as Compress from 'compress.js';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/filter';
import { AppConstants } from '../../helpers/AppConstants';


@Injectable()
export class LiveUpdatesService {
  private url = `${AppConstants.SOCKET_BASE_URL}/updates`;
  private socket;

  private broadcastSubject: BehaviorSubject<Event> = new BehaviorSubject<Event>(new Event(''));

  public next(event: Event): void {
    return this.broadcastSubject.next(event);
  }

  public subject(event: Event): Observable<Event> {
    return this.broadcastSubject.asObservable().filter(e => e.type === event.type);
  }


  constructor() {
  }

  getUpdates(idtoken: string) {
    return new Observable((observer) => {
      this.socket = io(this.url, {
        path: '/v1/live',
        transportOptions: {
          polling: { extraHeaders: { idtoken } },
        },
      });
      this.socket.on('connect', () => {
        console.log('CONNECTED');
        this.next(new Event('connected'));
      });

      this.socket.on('disconnect', () => {
        console.log('DISCONNECTED');
        this.next(new Event('disconnected'));
      });
      this.socket.on('update', (data) => {
        observer.next(data);
      });
      this.socket.on('error', error => observer.error(error));
      return () => {
        this.socket.disconnect();
      };
    });
  }

  sendMessage(message: string, title: string, push_notification: boolean) {
    this.socket.emit('upstream-update', { message, title, push_notification });
    return new Observable<{ uploaded, total }>((observer) => {
      this.socket.on('upload-progress', (update: { uploaded, total }) => {
        observer.next(update);
      });
      this.socket.on('upload-error', error => observer.error(error));
      this.socket.on('upload-complete', () => observer.complete());
    });
  }
}
