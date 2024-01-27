import { Component } from '@angular/core';
import { DataTransferService } from '../../Services/DataTransfer/data-transfer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent  {

  UserName='Name'
  IsLogin=false;

  constructor(
    private dataTransfer:DataTransferService,
    private router:Router
  ){}

  ngOnInit(){
    this.dataTransfer.UserName.subscribe(
      (data:any)=>{
        this.UserName=data
      }
    );

    this.dataTransfer.isLogin.subscribe(
      (data:any)=>{
        console.log("navbar:",data);

        this.IsLogin=data;
      }
    );
  }

  logout(){
    this.router.navigateByUrl("/")
  }



}
