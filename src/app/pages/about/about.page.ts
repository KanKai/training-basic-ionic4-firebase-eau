import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  items: any = [];

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.items = [
      { title: 'Amsterdam' },
      { title: 'Bogota' },
      { title: 'Buenos Aires' },
      { title: 'Cairo' },
      { title: 'Dhaka' },
      { title: 'Geneva' },
      { title: 'Hanoi' },
      { title: 'Islamabad' }
    ];
  }

  gotoBack() {
    this.navCtrl.navigateBack('');
  }

  onSearch($event) {
    console.log('event -> ', $event.target.value);
  }

}
