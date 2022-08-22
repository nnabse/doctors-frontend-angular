import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  public currRoute: 'Sign In' | 'Sign Up' = 'Sign In';

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.router.url === '/signUp') this.currRoute = 'Sign Up';
    if (this.router.url === '/signIn') this.currRoute = 'Sign In';
  }

  public redirectToMainPage(): void {
    this.router.navigate(['main']);
  }
}
