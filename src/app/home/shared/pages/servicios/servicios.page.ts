import { OnInit, Component, ElementRef, QueryList, ViewChildren,  } from '@angular/core';
import { IonCard } from '@ionic/angular';


import { HomePage } from '../../../home.page';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage implements OnInit {

  constructor(
    public homePage: HomePage,
    public authService: AuthService,
  ) {}

  ngOnInit() {}
}

