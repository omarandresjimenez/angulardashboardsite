import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit, OnDestroy {
  public constructor(private route: Router) {
  }
  public ngOnInit() {
    this.route.navigateByUrl('main/dashboard');
  }
  public ngOnDestroy() {
    console.log('Destroy main');
  }
}
