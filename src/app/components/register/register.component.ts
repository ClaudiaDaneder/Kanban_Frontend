import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  user: User = {
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    email: '',
  }
  confirm_password = '';

  constructor(private auth: AuthService, private router: Router) { }


  async registerUser() {
    if (this.user.password !== this.confirm_password) {
      alert('Passwords do not match!');
      return;
    }

    try {
      let response: any = await this.auth.registerUser(this.user);
      console.log('User registration successful', response);
      this.router.navigateByUrl('login')
    } catch (e) {
      console.log('Registration failed', e)
    }
  }
}
