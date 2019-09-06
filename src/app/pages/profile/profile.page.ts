import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UserInterface } from 'src/app/core/models/user.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userInfo: UserInterface;

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.getUserDetail();
  }

  gotoBack() {
    this.navCtrl.navigateBack('');
  }

  private async getUserDetail() {
    try {
      const userInfo = await this.authService.getUser();
      this.userInfo = userInfo;
    } catch (error) {}
  }


}
