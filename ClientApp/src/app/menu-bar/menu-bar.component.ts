import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent {
  viewMenu: boolean = true;

  viewBtn: boolean = false;

  ngOnInit() {
    this.viewMenu = false;
    setTimeout(() => {
      this.viewBtn = true;
    }, 2000);
  }

  viewBtnFunc() {
    if (!this.viewBtn && this.viewMenu) {
      this.viewMenu = false;
      setTimeout(() => {
        this.viewBtn = true;
      }, 2000);
    } else {
      this.viewBtn = false;
      this.viewMenu = true;
    }
  }
}
