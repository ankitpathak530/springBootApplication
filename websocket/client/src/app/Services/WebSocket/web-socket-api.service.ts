import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { DataTransferService } from '../DataTransfer/data-transfer.service';

@Injectable({
  providedIn: 'root',
})
export class WebSocketAPIService {
  url="http://localhost:9090"
  constructor(
    private dataTransfer:DataTransferService
  ) {}

  stompClient:any=null;

  connet() {
    let socket = new SockJS(`${this.url}/server1`);
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({}, (frame: any)=> {
      console.log('Connected : ' + frame);

      //subscribe
      this.stompClient.subscribe('/topic/return-to',(response: any)=> {
        console.log(response);

        this.showMessage(JSON.parse(response.body));
      });
    },(error:any)=>{
      console.log(error);

    });
  }

  showMessage(data:any){
    console.log(data);
    this.dataTransfer.setData(data);

  }

  sendMessage(data:any){
    this.stompClient.send("/app/message",{},JSON.stringify(data));



   }
}
