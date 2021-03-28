import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
// import { Chat } from 'src/app/models/chat';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from './auth.service';
// import { Message } from 'src/app/models/message';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chatList: AngularFireList<any>;
  chatForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private angularFirestore: AngularFirestore
  ) {
    this.buildForm();
  }

  private buildForm() {
    this.chatForm = this.formBuilder.group ({
      $key: [null, []],
      userUid: [''],
      userName: ['']
    });
  }


  // getChat() {
  //   this.chatList = this.angularFireDatabase.list('chat');
  //   return this.chatList.snapshotChanges();
  // }

  getChat() {
    return this.angularFirestore.collection('chats').snapshotChanges();
  }

  // addChat(chat: Chat) {
  //   this.angularFirestore.collection('chats').add(chat);
    // this.chatList.push ({
    //   userUid: chat.userUid,
    //   userName: chat.userName,
    //   message: {
    //     userUid: chat.message.userUid,
    //     userName: chat.message.userName,
    //     mensaje: chat.message.mensaje,
    //     createdAt: chat.message.createdAt
    //   }
    // });
  // }

  // setRooms(chat: Chat) {
  //   this.angularFirestore.collection('chats').doc(chat.$key).set({
  //     fromUid: 'fromUid',
  //     toUid: 'toUid'
  //   });
  // }
}
