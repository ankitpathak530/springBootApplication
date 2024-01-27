import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

import { ToastrModule, ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { DataTransferService } from '../../Services/DataTransfer/data-transfer.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
  ],

  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private dataTransfer:DataTransferService
    ) {}



  UserName: string = '';

  goToHomePage() {
    console.log("hello");

    if (this.UserName.length == 0) {
      this.toastr.error('', 'Please Enter your name  !!!', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'decreasing',
      });
      return;
    }
    this.dataTransfer.UserName.next(this.UserName);
    this.dataTransfer.isLogin.next(true);
    this.router.navigateByUrl('/home');
  }
}
