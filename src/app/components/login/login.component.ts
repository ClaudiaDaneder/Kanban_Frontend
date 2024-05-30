import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  username: string = '';
  password: string = '';
  loginFailed: boolean = false;


  async login() {
    try {
      let response: any = await this.auth.loginUserPassword(this.username, this.password);
      localStorage.setItem('token', response['token'])
      this.router.navigateByUrl('dashboard');
    } catch (e) {
      this.loginFailed = true;
      setTimeout(() => {
        this.loginFailed = false;
      }, 3000);

    }
  }
}
