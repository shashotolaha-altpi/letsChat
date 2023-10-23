import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {

  message: string | undefined;
  constructor(
    private socket:Socket
  ) { }

  ngOnInit() {
    this.socket.on('message', (data:any)=>this.message = data )
    this.sendmessage()
  }
  sendmessage(){
    this.socket.emit('sendMessage', { message: 'Hello, server!' });
  }
}
