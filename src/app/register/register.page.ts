import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { User } from '../models/user';

export interface MessagesIndex {
  [index: string]: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  params = {
    'invalid-argument': 'Erro: Um argumento inválido foi fornecido.',
    'invalid-disabled-field': 'Erro: O valor fornecido para a propriedade de usuário é inválido.',
    'argument-error': 'No has ingresado tus datos',
    'email-already-in-use': 'Esta cuenta ya existe, intenta con otro email',
    'invalid-email': 'Correo electronico invalido',
    'weak-password': 'Contraseña débil. Intenta con otra'

     /* ADD HERE THE OTHERs IDs AND THE CORRESPONDING MESSAGEs */

  } as MessagesIndex;

  constructor(
    private authService: AuthService,
    public router: Router,
    public alertController: AlertController
  ) { }

  submitted: boolean;

  ngOnInit() {
  }

  onSubmitRegister(user: User) {
    this.authService.register(this.authService.authForm.value).then((res) => {
      this.authService.isAuth2().subscribe(auth => {
        this.authService.isUser(auth.uid).subscribe(data => {
          if (auth.email == data.email){
            auth.updateProfile({
              displayName: data.name,
              photoURL: 'https://firebasestorage.googleapis.com/v0/b/aes-capacitor.appspot.com/o/user.png?alt=media&token=3434ac34-6835-43a9-883f-0900c4ff857d'
            });
          }
        });
      });
      this.router.navigate(['/register']);
    })
    .catch((err) => this.presentAlert(err.code) );
  }

  async presentAlert(code) {
    code = code.split('/')[1];
    if (this.params[code]) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alerta',
        message: this.params[code],
        buttons: ['OK']
      });
      await alert.present();
  } else {
  }

  }

  public printErrorByCode(code: string): string {
    code = code.split('/')[1];
    if (this.params[code]) {
        return (this.params[code]);
    } else {
        return ('Ocorreu algum erro desconhecido! \n Codigo erro: ' + code);
    }
}

}
