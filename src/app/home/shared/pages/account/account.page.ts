import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { UsersService } from '../../../../services/users.service';

import { FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

import { CameraResultType, Plugins } from '@capacitor/core';
import { DomSanitizer } from '@angular/platform-browser';
const { Camera } = Plugins;


@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  public name: string;
  public email: string;
  public photoUrl: string;
  public occupation: string;

  constructor(
    public usersService: UsersService,
    private authService: AuthService,
    private angularFirestore: AngularFirestore,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getCurrentUser();
    this.getRole();
  }

  private getRole() {
    this.authService.isAuth2().subscribe(auth => {
      if (auth) {
        this.authService.isUser(auth.uid).subscribe(userRole => {
          const isAdmin = Object.assign({}, userRole).admin;
          const isTecnico = Object.assign({}, userRole).tecnico;
          if (isAdmin) {
            this.occupation = 'Administrador';
          } else if (isTecnico) {
            this.occupation = 'Técnico';
          } else {
            this.occupation = 'Cliente';
          }
        });
      }
    });
  }

  private getCurrentUser() {
    this.authService.isAuth2().subscribe(auth => {
      if (auth === null) {
        this.usersService.userForm.setValue({
          $key: '',
          name: '',
          email: '',
          urlImage: ''
        });
        this.photoUrl = '';
      } else {
        const { displayName, email, photoURL, uid } = auth;
        this.usersService.userForm.setValue({
          $key: uid,
          name: displayName,
          email,
          urlImage: photoURL
        });
        this.name = displayName;
        this.photoUrl = photoURL;
      }
    });
  }

  public async doRefresh(event) {
    await this.getCurrentUser();
    setTimeout(() => {
      event.target.complete();
    }, 200);
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });

    this.photoUrl = image.webPath;
  }

  getImgContent() {
    return this.sanitizer.bypassSecurityTrustUrl(this.photoUrl);
  }

}
