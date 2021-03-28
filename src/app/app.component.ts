import { Component } from '@angular/core';

import { AlertController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { OneSignal } from '@ionic-native/onesignal';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor(
    private alertCtrl: AlertController,
    public router: Router,
    // private oneSignal: OneSignal,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.setupPush();
    });

    this.checkDarkTheme();
  }

  setupPush() {
    OneSignal.startInit('6cb60a74-4cd7-4495-8bde-297ac8f04f58', '384939530619');

    OneSignal.inFocusDisplaying(OneSignal.OSInFocusDisplayOption.None);

    OneSignal.handleNotificationReceived().subscribe((data) => {
      const msg = data.payload.body;
      const title = data.payload.title;
      const additionalData = data.payload.additionalData;
      this.showAlert(title, msg, additionalData.task);
    });

    OneSignal.handleNotificationOpened().subscribe((data) => {
      const additionalData = data.notification.payload.additionalData;

      this.showAlert('Notificacion Openeed', 'You Already read this before', additionalData.task);
    });

    OneSignal.endInit();
  }

  async showAlert(title, msg, task) {
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: msg,
      buttons: [
        {
          text: `Action: ${task}`,
          handler: () => {

          }
        }
      ]
    });

    alert.present();

  }

  checkDarkTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    if ( prefersDark.matches ) {
      document.body.classList.toggle( 'dark' );
    }
  }
}
