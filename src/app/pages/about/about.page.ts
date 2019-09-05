import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  items: any = [];
  terms: string;

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.getItems();
  }

  gotoBack() {
    this.navCtrl.navigateBack('');
  }

  onSearch($event) {
    console.log('event -> ', $event.target.value);
  }

  getItems() {
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

}
