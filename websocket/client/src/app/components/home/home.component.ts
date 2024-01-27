import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTransferService } from '../../Services/DataTransfer/data-transfer.service';
import { WebSocketAPIService } from '../../Services/WebSocket/web-socket-api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  ChatData: any = [];

  Message = '';
  Username='';



  constructor(private router: Router,
    private dataTransfer:DataTransferService,
    private webSocketApi:WebSocketAPIService,
    ) {}

  ngOnInit() {

    this.webSocketApi.connet()

    // const sock=new SockJS
    this.dataTransfer.UserName.subscribe(
      (data:any)=>{
        this.Username=data;
      }
    );

    this.dataTransfer.ChatData.subscribe(
      (data:any)=>{
        this.ChatData=data;

      }
    );
  }

  sendMessage(){

    const data={
      name:this.Username,
      content:this.Message
    }
    this.Message=''
    this.webSocketApi.sendMessage(data);

  }
}
