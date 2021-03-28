import { Injectable, NgZone, EventEmitter } from '@angular/core';
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

  private _emitNumber: EventEmitter<object>;

  public userData$: Observable<User>;
  authForm: FormGroup;

  constructor(
    private angularFirestore: AngularFirestore,
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private firebaseAuth: AngularFireAuth,
    ) {
      this._emitNumber = new EventEmitter<object>();
      this.userData$ = this.firebaseAuth.authState;
      this.buildForm();
  }

  private buildForm() {
    this.authForm = this.formBuilder.group ({
      $key: [null, []],
      name: [''],
      email: [''],
      phoneNumber: [],
      password: [''],
      customer: [true],
      tecnico: [false],
      admin: [false],
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
        this.angularFirestore.collection('users').doc(uid).set({
          admin: user.admin,
          tecnico: user.tecnico,
          customer: user.customer,
          email: user.email,
          name: user.name,
          uid
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

  isUser(userUid) {
    return this.angularFirestore.doc<User>(`users/${userUid}`).valueChanges();
  }

  public get emitNumber(): EventEmitter<object> {
    return this._emitNumber;
  }

  public set emitNumber(emitNumber: EventEmitter<object>) {
    this._emitNumber = emitNumber;
  }

}
