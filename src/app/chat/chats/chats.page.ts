import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { WebSocketService } from './services/web-socket.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {
  message: string = 'this is texting message';
  getmessage: any = 'this is texting message';
  constructor(
    private socket: Socket,
    private socketService: WebSocketService
  ) {}

  ngOnInit() {
    console.log(this.socket);
    this.socket.on('connection', () => {
      console.log(this.socket);
      this.socketService.sendMessage(this.message);
      this.getmessage = this.socketService.getMessage()
      console.log(this.getmessage)
    });
  }
}
