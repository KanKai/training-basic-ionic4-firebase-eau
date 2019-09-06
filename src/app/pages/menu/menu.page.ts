import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  selectPath = '';

  pages = [
    {
      title: 'หน้าหลัก',
      url: '/members'
    },
    {
      title: 'ข้อมูลส่วนตัว',
      url: '/members/profile'
    }
  ];

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectPath = event.url;
      }
    });
  }

  ngOnInit() {
  }

  async logout() {
    try {
      await this.authService.logoutUser();
      this.router.navigateByUrl('login');
    } catch (error) {}
  }

}
