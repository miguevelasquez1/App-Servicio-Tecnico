import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HomePage } from 'src/app/home/home.page';

import { AuthService } from '../../../../../servicios/auth.service';
import { ChatService } from '../../../../../servicios/chat.service';
import { Chat } from 'src/app/models/chat';

@Component({
  selector: 'app-domesticos',
  templateUrl: './domesticos.component.html',
  styleUrls: ['./domesticos.component.scss'],
})
export class DomesticosComponent implements OnInit {
  listChat: Chat[];
  chats = [];

  userUid;
  currentUser;
  currentUserName;

  token: string = '';

  constructor(
    private authService: AuthService,
    public chatService: ChatService,
    public homePage: HomePage,
    public alertController: AlertController
    ) { }

  ngOnInit() {
    this.getCurrentUser();

    this.chatService.getChat().subscribe(actionArray => {
      this.listChat = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as Chat
        };
      });
    });

  }

  

  getCurrentUser() {
    this.authService.isAuth2().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.authService.isUser(this.userUid).subscribe(user => {
          this.currentUser = user.uid;
          this.currentUserName = user.name;
        });
      }
    });

  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'foo',
      header: 'Formulario de contacto',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre'
        },
        {
          name: 'email',
          type: 'email',
          placeholder: 'Correo electronico'
        },
        {
          name: 'cel',
          type: 'tel',
          placeholder: 'Numero de celular'
        },
        // multiline input.
        {
          name: 'problem',
          id: 'problem',
          type: 'textarea',
          placeholder: 'Escribenos aqui que servicio necesitas y cual es tu problema'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Ok',
          handler: xd => {
            console.log(xd);
          }
        }
      ]
    });

    await alert.present();
  }

}
