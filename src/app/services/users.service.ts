import { Injectable } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userList: AngularFireList<any>;
  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private afd: AngularFireDatabase
  ) {
    this.buildForm();

  }

  private buildForm() {
    this.userForm = this.formBuilder.group ({
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

  // onUpload(e) {
  //   const id = Math.random().toString(36).substring(2);
  //   const file = e.target.files[0];
  //   const filePath = 'upload/imagen.png';
  //   const ref = this.storage.ref(filePath);
  //   const task = this.storage.upload(filePath, file);
  // }
  

  // getUsers() {
  //   this.userList = this.afd.list('user');
  //   return this.userList.snapshotChanges();
  // }

  // insertUser(user: User) {
  //   this.userList = this.afd.list('user');
  //   this.userList.push ({
  //     name: user.name,
  //     email: user.email,
  //     admin: user.admin,
  //     tecnico: user.tecnico
  //   });
  // }
}
