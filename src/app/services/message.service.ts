import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Message } from 'src/app/models/message';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ChatPage } from '../home/shared/pages/chat/chat.page';
import { AuthService } from './auth.service';
import { AngularFirestore, DocumentReference, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ChatFeedPage } from 'src/app/home/shared/pages/chat-feed/chat-feed.page';
import { Chat } from 'src/app/models/chat';
// import { MessageViewModel } from 'src/app/models/message-view-model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  // messageCollection: AngularFirestoreCollection<MessageViewModel>;
  messageList: AngularFireList<any>;
  selectedMessage: Message = new Message();
  messageForm: FormGroup;
  currentUser: string;
  public userUid: string = null;


  constructor(
    private chatFeedPage: ChatFeedPage,
    private angularFirestore: AngularFirestore,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private aFDb: AngularFireDatabase,
    private afs: AngularFirestore
  ) {
    this.buildForm();
  }

  lol = this.chatFeedPage.chatKey;

  private buildForm() {
    this.messageForm = this.formBuilder.group ({
      userUid: [''],
      userName: [''],
      mensaje: [],
      createdAt: []
    });
  }

  getMessage() {
    this.messageList = this.aFDb.list('message');
    return this.messageList.snapshotChanges();
  }

  insertMessage(message: Message, chat: string) {
    this.messageList.push ({
      userUid: message.userUid,
      userName: message.userName,
      mensaje: message.mensaje,
      createdAt: message.createdAt
    }).then(messageData => {

      const id = messageData.key;
      this.afs.collection('chats').doc(chat).collection('messages').doc(id).set({
        userUid: message.userUid,
        userName: message.userName,
        mensaje: message.mensaje,
        createdAt: message.createdAt
      });
    });
  }

  // addMessage(message: Message) {
  //   this.angularFirestore.collection('chats').doc('-MDvydkw-S7q6TXxBOct').collection('message').add(message);
  // }

  startChat(chat: Chat) {
    this.chatFeedPage.chatKey = chat.id
  }

  getMessage2(chat: string) {
    // this.chatFeedPage.startChat(chat);
    return this.angularFirestore.collection('chats').doc(chat).collection('messages').snapshotChanges();
  }

  getCurrentUser() {
    this.authService.isAuth2().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.authService.isUser(this.userUid).subscribe(user => {
          this.currentUser = Object.assign({}, user).name;
        });
      }
    });
  }
}
