import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LayoutComponent } from 'src/app/home/shared/components/layout/layout.component';
import { HomePage } from '../../../home.page';
import { AuthService } from '../../../../servicios/auth.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage implements OnInit {

  constructor(
    public homePage: HomePage,
    public authService: AuthService
    ) { }

    public isAdmin: any = null;
    public userUid: string = null;

  ngOnInit() { }
}

