import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
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
          case '/signIn':
            this.title = 'Sign In';
            break;
          case '/signUp':
            this.title = 'Sign Up';
            break;
          case '/main':
            this.title = 'Main';
            break;
          default:
            this.title = 'Sign In';
            break;
        }
      }
    });
  }
}
