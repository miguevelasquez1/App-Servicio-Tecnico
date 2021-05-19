import { Component, ElementRef, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/core';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.page.html',
  styleUrls: ['./personal-data.page.scss'],
})
export class PersonalDataPage {

  private photoFile: Blob;
  public photoUrl: any;
  public name: string;
  public uploadPercent: Observable<number | undefined>;

  @ViewChild('fileInput', { static: false})fileInput: ElementRef;
  constructor(
    public usersService: UsersService,
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    private storage: AngularFireStorage,
    private angularFirestore: AngularFirestore,
    private router: Router,
    private alertController: AlertController
  ) { }

  ionViewWillEnter() {
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
        this.name = displayName;
        this.photoUrl = photoURL;
      }
    });
  }

  getImgContent() {
    return this.sanitizer.bypassSecurityTrustUrl(this.photoUrl);
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64
    });

    const rawData = atob(image.base64String);
    const bytes = new Array(rawData.length);
    for (let x = 0; x < rawData.length; x++) {
        bytes[x] = rawData.charCodeAt(x);
    }
    const arr = new Uint8Array(bytes);
    this.photoFile = new Blob([arr], {type: 'image/png'});

    const reader  = new FileReader();
    reader.onloadend = () => {
      this.photoUrl = reader.result;
    };
    reader.readAsDataURL(this.photoFile);
  }

  onSubmitUpdate(user: User) {

    this.authService.isAuth2().subscribe(auth => {
      if (auth){
        const filePath = `users/${auth.uid}`;
        const ref = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, this.photoFile);
        this.uploadPercent = task.percentageChanges();
        task.snapshotChanges().pipe(
          finalize(() => {
            ref.getDownloadURL().subscribe(url => {
              auth.updateProfile({
                displayName: user.name,
                photoURL: url
              });
            });
          })
        ).subscribe();
      }

      this.angularFirestore.collection('users').doc(auth.uid).update({
        name: user.name
      });
    });

    this.router.navigate(['/home/account']);
  }

  async presentAlertConfirm(user: User) {
    const alert = await this.alertController.create({
      cssClass: 'alert_submit',
      header: '¿Deseas Confirmar?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.getCurrentUser();
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.onSubmitUpdate(user);
          }
        }
      ]
    });

    await alert.present();
  }

}
