import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { UsersService } from '../../../../services/users.service';

import { FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  name;
  email;
  photoUrl;
  phoneNumber;

  constructor(
    private router: Router,
    public usersService: UsersService,
    private authService: AuthService,
    private angularFirestore: AngularFirestore
  ) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.isAuth2().subscribe(auth => {
      // console.log(auth);
      this.name = auth.displayName;
      this.email = auth.email;
      this.phoneNumber = auth.phoneNumber;
      this.photoUrl = auth.photoURL;
    });
  }

  onSubmitUpdate(user: User) {
    this.authService.isAuth2().subscribe(auth => {
      if (auth){
        auth.updateProfile({
          displayName: user.name,
          photoURL: user.photoUrl
          // phoneNumber: user.phoneNumber TOCA INYECTAR LA VERIFICACION DE NUMERO DE FIREBASE CON UN CODIGO
        }).then(() => {
          this.name = user.name;
        }).catch(error => {
          // console.log('error', error);
        });
      }
      this.angularFirestore.collection('users').doc(auth.uid).update({
        name: user.name
      });
      // console.log(auth.displayName);
    });

    this.router.navigate(['/']);
  }

}
