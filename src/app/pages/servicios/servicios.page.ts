import { OnInit, Component, ElementRef, QueryList, ViewChildren,  } from '@angular/core';
import { IonCard } from '@ionic/angular';
import { ServicesService } from 'src/app/services/services.service';


import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage implements OnInit {

  constructor(
    public authService: AuthService,
    public servicesService: ServicesService
  ) {
    this.servicesService.saveDisabled = true;
  }

  ngOnInit() {}

  public activeDefaultCard() {
    this.servicesService.cardDefault = true;
  }

  public editCard() {
    this.servicesService.cardDefault = false;
    this.servicesService.cardReorder = false;
  }

  public reorderCard() {
    this.servicesService.cardDefault = false;
    this.servicesService.cardReorder = true;
  }

}

