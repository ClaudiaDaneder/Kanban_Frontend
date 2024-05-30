import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgbDropdownModule, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { BoardListComponent } from '../board-list/board-list.component';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/user';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgbDropdownModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private offcanvasService = inject(NgbOffcanvas);
  private us = inject(UserService);
  auth = inject(AuthService);
  private router = inject(Router)
  user!: any;
  isLoggedin!: boolean;

  constructor() {
    this.isLoggedIn();
    this.getUserName();
  }

  openBoardList() {
    let modalRef = this.offcanvasService.open(BoardListComponent);
    modalRef.componentInstance.user = this.user;
  }

  async getUserName() {
    if (this.isLoggedin) {
      let user = await this.us.getUserData();
      this.user = user;
    }
  }


  logout() {
    try {
      this.auth.logout();
      localStorage.removeItem('token');
      this.isLoggedIn();
      console.log('Logout Successful');
      this.router.navigateByUrl('login');

    } catch (e) {
      console.log(e);
    }
  }

  isLoggedIn() {
    this.isLoggedin = this.auth.isLoggedIn();
  }
}
