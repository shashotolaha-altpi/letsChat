import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { eventNames } from 'process';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor(
    private socket: Socket
  ) { }

  getIntialData(){
    return this.createObserable
  }
  getUpdatedData(){}

  createObserable(event:string){
    // return this.socket.fromEvent<T>(eventName: string): Observable<T> {}
  }



}
