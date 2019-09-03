import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthInterface } from '../_models/auth.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;
  errorMessage = '';
  validationMessages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'pattern', message: 'Password must be at least 5 char.' }
    ]
  };
  loading: HTMLIonLoadingElement;

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ]))
    });
  }

  async loginUser(loginForm: FormGroup): Promise<void> {
    if (!loginForm.valid) {
      this.presentAlert();
    } else {
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();

      const request = (loginForm.value as AuthInterface);

      this.authService.loginUser(request)
        .then(
          () => {
            this.loading.dismiss().then(() => {
              this.router.navigateByUrl('dashboard');
            });
          },
          (error) => {
            this.loading.dismiss().then(async () => {
              const alert = await this.alertController.create({
                message: error.message,
                buttons: [{ text: 'Ok', role: 'cancel' }],
              });
              await alert.present();
            });
          }
        );
    }
    // this.authService.loginUser(value)
    // .then(res => {
    //   console.log(res);
    //   this.errorMessage = '';
    //   this.navCtrl.navigateForward('/dashboard');
    // }, err => {
    //   this.errorMessage = err.message;
    // });
  }

  goToRegisterPage() {
    this.navCtrl.navigateForward('/register');
  }

  private async presentAlert() {
    const alert = await this.alertController.create({
      header: 'ข้อมูลผิดพลาด',
      message: 'อีเมล หรือ รหัสผ่านไม่ถูกต้อง.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
