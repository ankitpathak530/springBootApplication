import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  constructor() { }


  UserName=new BehaviorSubject('');
  isLogin=new BehaviorSubject(false);
  ChatData=new BehaviorSubject([]);

  setData(newData:any){
    let oldData:any=[];
    this.ChatData.subscribe(
      (data:any)=>{
        oldData=data;
      }
    );
    oldData.push(newData);
    this.ChatData.next(oldData);
  }



}
