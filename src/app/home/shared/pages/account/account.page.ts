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

  name;
  email;
  photoUrl;

  constructor(
    private router: Router,
    public usersService: UsersService,
    private authService: AuthService,
    private angularFirestore: AngularFirestore,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
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
        this.photoUrl = photoURL;
      }
    });
  }

  onSubmitUpdate(user: User) {
    this.authService.isAuth2().subscribe(auth => {
      if (auth){
        auth.updateProfile({
          displayName: user.name,
          photoURL: user.photoUrl
        });
      }
      this.angularFirestore.collection('users').doc(auth.uid).update({
        name: user.name
      });
    });

    this.router.navigate(['/']);
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
