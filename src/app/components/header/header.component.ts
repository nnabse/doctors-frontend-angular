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

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        switch (event.url) {
          case Routes.signIn:
            this.title = PagesName.signIn;
            break;
          case Routes.signUp:
            this.title = PagesName.signUp;
            break;
          case Routes.main:
            this.title = PagesName.main;
            break;
          default:
            this.title = PagesName.main;
            break;
        }
      }
    });
  }
}
