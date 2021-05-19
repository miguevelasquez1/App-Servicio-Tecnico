import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Plugins, CameraResultType, Capacitor, CameraSource } from '@capacitor/core';



import { InventarioService } from 'src/app/services/inventario.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
const { Camera } = Plugins;

const isAvailable = Capacitor.isPluginAvailable('Camera');

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {

  private files: Array<Blob>;
  public buttonCount: number;
  public limitCount: number;
  private imageList: Array<any>;
  private inventarioList: Array<object>;

  constructor(
    public inventarioService: InventarioService,
    private storage: AngularFireStorage,
    private router: Router,
    private alertCtrl: AlertController
  ) {
    this.files = [];
    this.imageList = [];
    this.disableButtonImage();
  }

  ngOnInit() {
    this.inventarioService.getInventario()
    .subscribe(list => {
      this.inventarioList = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
    });

    this.disableButtonImage();
    this.imageList = [...this.inventarioService.imageList];
    console.log(this.inventarioService.imageList, 'ngOnInit');
  }

  ionViewWillEnter() {
    this.imageList = [...this.inventarioService.imageList];
    console.log(this.inventarioService.imageList, 'ionViewWillEnter');
  }

  private disableButtonImage() {
    this.limitCount = 10;
    this.buttonCount = this.inventarioService.imageList.length;
  }

  getDate(e) {
    return new Date(e.target.value).getMonth();
  }

  public onUpload(e) {
    for (let i = 0; i < (e.target.files.length); i++) {
      const id = Math.random().toString(36).substring(2);
      const file = e.target.files[i];
      const filePath = `uploads/${id}`;
      const ref = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
      task.snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe(url => {
            const date = new Date();
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
              'July', 'August', 'September', 'October', 'November', 'December'];

            const month = monthNames[date.getMonth()];
            const day = date.getDate();
            const year = date.getFullYear();
            this.inventarioService.imageList.push({urlImage: url.toString(), dateImage: `${day} ${month} / ${year}`});
          });
        })
      ).subscribe();
    }
  }

  public onSubmit() {
    if (this.inventarioService.inventarioForm.valid) {

      if (this.files.length > 0) {
        this.uploadPhotosToFirebase();
      } else {
        this.sendData();
      }
    }
  }

  private async uploadPhotosToFirebase() {
    for (const file of this.files) {
      const id = Math.random().toString(36).substring(2);
      const filePath = `uploads/${id}`;
      const ref = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
      console.log('2');
      task.snapshotChanges().pipe(
        finalize(async () => {
          await ref.getDownloadURL().subscribe(url => {
            const date = new Date();
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];

            const month = monthNames[date.getMonth()];
            const day = date.getDate();
            const year = date.getFullYear();
            this.inventarioService.addImagenField();
            this.inventarioService.imageList.push({urlImage: url.toString(), dateImage: `${day} ${month} / ${year}`});
            console.log(this.inventarioService.inventarioForm.value, 'value');
            if (file === this.files[this.files.length - 1]) {
              this.sendData();
            }
          });
        })
      ).subscribe();
    }
  }

  private sendData() {
    console.log('a2');
    if (this.inventarioService.inventarioForm.get('$key').value === null) {
      this.inventarioService.insertInventario(this.inventarioService.inventarioForm.value);
    } else {
      this.inventarioService.updateInventario(this.inventarioService.inventarioForm.value);
    }

    console.log(this.inventarioService.inventarioForm.value, 'value');

    this.inventarioService.resetForm(this.inventarioService.inventarioForm);
    this.router.navigate(['/home/inventario']);
  }

  public addField(): void {
    this.buttonCount++;
  }

  public removeField(): void {
    this.buttonCount--;
  }

  public async takePicture() {
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
    this.files.push(new Blob([arr], {type: 'image/png'}));

    const reader  = new FileReader();
    reader.onloadend = () => {
      const date = new Date();
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

      const month = monthNames[date.getMonth()];
      const day = date.getDate();
      const year = date.getFullYear();
      this.imageList.push({urlImage: reader.result, dateImage: `${day} ${month} / ${year}`});
    };
    reader.readAsDataURL(this.files[this.files.length - 1]);
  }

  public async getPhoto() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
      quality: 100
    });

  }

  public async removeImage(image: string) {
    const alert = await this.alertCtrl.create({
      header: '¿Seguro de que quieres eliminar esta imagen?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'accept',
          handler: () => {
            const index = this.imageList.indexOf( image );
            this.imageList.splice(index, 1);

          }
        }
      ]
    });

    alert.present();
  }

  public exitWithouthSave() {
    this.alertCtrl.create({
      header: '¿Deseas salir sin guardar los cambios?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'accept',
          handler: () => {
            this.router.navigate(['/home/inventario']);
          }
        }
      ]
    });
  }

}
