import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { BoardListComponent } from './components/board-list/board-list.component';
import { RegisterComponent } from './components/register/register.component';
import { BoardDetailsComponent } from './components/board-details/board-details.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'boards', component: BoardListComponent },
    { path: 'boards/:id', component: BoardDetailsComponent },
];
