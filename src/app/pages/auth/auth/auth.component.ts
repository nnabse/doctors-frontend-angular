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
    if (this.router.url === Routes.SIGN_UP) this.currRoute = PagesName.SIGN_UP;
    if (this.router.url === Routes.SIGN_IN) this.currRoute = PagesName.SIGN_IN;
  }

  public redirectToMainPage(): void {
    this.router.navigate(['main']);
  }
}
