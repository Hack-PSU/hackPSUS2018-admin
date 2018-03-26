import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import * as Compress from 'compress.js';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/filter';


@Injectable()
export class LiveUpdatesService {
  private url = 'http://localhost:5000/updates';
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

  sendMessage(message: string, image: File, title: string, push_notification: boolean) {
    this.socket.emit('upstream-update', { message, title, push_notification, image: { name: image.name, type: image.type } });
    const compress = new Compress();
    compress.compress([image], {
      size: 0.5, // the max size in MB, defaults to 2MB
      quality: 1, // the quality of the image, max is 1,
      maxWidth: 1920, // the max width of the output image, defaults to 1920px
      maxHeight: 1920, // the max height of the output image, defaults to 1920px
      resize: true, // defaults to true, set false if you do not want to resize the image width and height
    }).then((data) => {
      // returns an array of compressed images
      if (data) {
        this.socket.emit('image', `${data[0].prefix}${data[0].data}`);
      }
    });
    return new Observable<{ uploaded, total }>((observer) => {
      this.socket.on('upload-progress', (update: { uploaded, total }) => {
        observer.next(update);
      });
      this.socket.on('upload-error', error => observer.error(error));
      this.socket.on('upload-complete', () => observer.complete());
    });
  }
}
