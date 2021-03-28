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
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
  }

  private buildForm() {
    this.userForm = this.formBuilder.group({
      $key: [null, []],
      name: ['', [Validators.required]],
      email: [{value: '', disabled: true}, [Validators.required]],
      urlImage: ['', [Validators.required]]
    });
  }
}
