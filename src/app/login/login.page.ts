import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    public router: Router,
    public alertController: AlertController
  ) {}

  ngOnInit() {}


  onSubmitLogin() {
    this.authService
      .login(this.authService.authForm.value)
      .then((res) => {
        this.router.navigate(['/home']);
      })
      .catch((err) => this.presentAlert(err.message) );

  }

  async presentAlert(err) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      message: err,
      buttons: ['OK']
    });

    await alert.present();
  }

  onSubmitRegister() {
    this.router.navigate(['/register']);
  }

}
