import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from 'src/app/models/user';
import { map } from 'rxjs/operators';

import { Observable, BehaviorSubject } from 'rxjs';
// import { auth } from 'firebase';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userData$;
  authForm: FormGroup;

  constructor(
    private angularFirestore: AngularFirestore,
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private firebaseAuth: AngularFireAuth,
    ) {
      this.userData$ = firebaseAuth.authState;
      this.buildForm();
  }

  private buildForm() {
    this.authForm = this.formBuilder.group ({
      $key: [null, []],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phoneNumber: [],
      password: ['', [Validators.required]],
      customer: [true, [Validators.required]],
      tecnico: [false, [Validators.required]],
      admin: [false, [Validators.required]],
      urlImage: ['']
    });
  }

  getUser() {
    return this.angularFirestore.collection('users').snapshotChanges();
  }

  populateForm(user) {
    this.authForm.setValue(user);
  }

  login(user: User) {

    return new Promise((resolve, rejected) => {
      this.firebaseAuth.signInWithEmailAndPassword(user.email, user.password).then(login => {
        resolve(login);
      }).catch(err => rejected(err));
    });
  }

  signOut() {
    this.firebaseAuth.signOut();
  }

  register(user: User) {
    return new Promise((resolve, rejected) => {
    this.firebaseAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then(userData => {
        const uid = userData.user.uid;
        // console.log(userData.user.);
        this.angularFirestore.collection('users').doc(uid).set({
          admin: user.admin,
          tecnico: user.tecnico,
          customer: user.customer,
          email: user.email,
          name: user.name,
          uid: uid
        });
        resolve(userData);
      }).catch(err => rejected(err));
    });
  }

  isAuth() {
    return this.firebaseAuth.authState;
  }

  isAuth2() {
    return this.firebaseAuth .authState.pipe(map(auth => auth));
  }

  // saveUserProfile(user: User) {
  //   this.firebaseAuth.auth.currentUser.updateProfile({
  //     displayName: user.name
  //   });
  // }

  isUserAdmin(userUid) {
    return this.angularFirestore.doc<User>(`users/${userUid}`).valueChanges();
  }

}