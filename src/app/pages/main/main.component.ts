import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public pageLoaded = true;

  constructor(private router: Router) {}

  private loadPage() {
    this.pageLoaded = false;
    setTimeout(() => {
      this.pageLoaded = true;
    }, 1000);
  }

  ngOnInit(): void {
    this.loadPage();
  }

  public logout() {
    this.router.navigate(['signUp']);
  }
}
