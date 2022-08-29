import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Routes, PagesName } from '@enums/auth.enums';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public title = '';
  public isMainPage = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        switch (event.url) {
          case Routes.SIGN_IN:
            this.title = PagesName.SIGN_IN;
            this.isMainPage = false;
            break;
          case Routes.SIGN_UP:
            this.title = PagesName.SIGN_UP;
            this.isMainPage = false;
            break;
          case Routes.MAIN:
            this.title = PagesName.MAIN;
            this.isMainPage = true;
            break;
          default:
            this.title = PagesName.MAIN;
            this.isMainPage = true;
            break;
        }
      }
    });
  }

  public logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.router.navigate(['/signIn']);
    return;
  }
}
