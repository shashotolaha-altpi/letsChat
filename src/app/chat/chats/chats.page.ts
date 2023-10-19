import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {
  socket = io('http://localhost:7000');

  constructor() {}

  ngOnInit() {
    console.log('kwhdfk');
    
    console.log(this.socket);
  }
}
