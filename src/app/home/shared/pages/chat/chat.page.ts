import { Component, ViewChild, OnInit} from '@angular/core';

import { IonContent } from '@ionic/angular';
import { AuthService } from '../../../../servicios/auth.service';
import { ChatService } from '../../../../servicios/chat.service';
import { MessageService } from '../../../../servicios/message.service';
import { Message } from 'src/app/models/message';
import { HomePage } from 'src/app/home/home.page';
import { ChatFeedPage } from '../chat-feed/chat-feed.page';
import { AngularFirestore } from '@angular/fire/firestore';
import { Chat } from 'src/app/models/chat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  list: Message[];

  chatKey = '6IzyWg1OGnjvqIrdChJQ';
  lol = null;

  messages = [];
  currentUser: string;
  currentUserName: string;
  photoUrl = 'https://firebasestorage.googleapis.com/v0/b/aes-capacitor.appspot.com/o/user_1.png?alt=media&token=837779fd-ea7d-4a47-8084-10bb7162168c';
  createdAt = new Date().getTime();
  public userUid: string = null;

  @ViewChild(IonContent) content: IonContent;

  constructor(
    private angularFirestore: AngularFirestore,
    private chatService: ChatService,
    private homePage: HomePage,
    private authService: AuthService,
    public messageService: MessageService
    ) { }

  ngOnInit() {

    console.log(this.chatKey);
    this.getCurrentUser();

    this.messageService.getMessage()
      .subscribe(list => {
        this.messages = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      }
    );

    this.getMessage2(this.chatKey).subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as Message
        };
      });
    });

    setTimeout(() => {
      this.content.scrollToBottom();
    });

  }






  getMessage2(chat: string) {
    console.log(this.chatKey);
    // this.chatFeedPage.startChat(chat);
    // console.log(this.chatFeedPage.listChat);
    return this.angularFirestore.collection('chats').doc(chat).collection('messages').snapshotChanges();
  }

  startChat(chat: Chat) {
    console.log(chat.id);
    this.chatKey = chat.id;
    console.log('renombre', this.chatKey);
  }

  onSubmit() {
    if (this.messageService.messageForm.valid) {
      this.messageService.insertMessage(this.messageService.messageForm.value, this.chatKey);

      this.messageService.messageForm.get('mensaje').reset();

      setTimeout(() => {
        this.content.scrollToBottom();
      });
    }
  }


  getCurrentUser() {
    this.authService.isAuth2().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(user => {
          this.currentUser = user.uid;
          this.currentUserName = user.name;
        });
      }
    });
  }

}