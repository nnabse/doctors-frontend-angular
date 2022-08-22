import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  public pageLoaded = true;

  constructor(private router: Router) {}

  // private loadPage() {
  //   this.pageLoaded = false;
  //   setTimeout(() => {
  //     this.pageLoaded = true;
  //   }, 1000);
  // }

  // ngOnInit(): void {
  //   this.loadPage();
  // }

  public logout() {
    const isSure = confirm('Are you sure you want logout?');
    if (isSure) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      this.router.navigate(['/signIn']);
    }
    return;
  }
}
