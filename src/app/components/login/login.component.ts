import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  async login() {
    try {
      let response:any = await this.auth.loginUserPassword(this.username, this.password);
      localStorage.setItem('token', response['token'])
      this.router.navigateByUrl('dashboard')
    } catch(e) {
      alert('Login failed!');
    }
  }
}
