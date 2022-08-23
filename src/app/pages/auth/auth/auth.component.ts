import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Routes, PagesName } from '@enums/auth.enums';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  public currRoute: 'Sign In' | 'Sign Up' = 'Sign In';

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.router.url === Routes.signUp) this.currRoute = PagesName.signUp;
    if (this.router.url === Routes.signIn) this.currRoute = PagesName.signIn;
  }

  public redirectToMainPage(): void {
    this.router.navigate(['main']);
  }
}
