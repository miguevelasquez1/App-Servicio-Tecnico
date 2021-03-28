import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IonReorderGroup } from '@ionic/angular';
import { ItemReorderEventDetail } from '@ionic/core';

import { ServicesService } from '../../../../services/services.service';

@Component({
  selector: 'app-card-service',
  templateUrl: './card-service.component.html',
  styleUrls: ['./card-service.component.scss'],
})
export class CardServiceComponent implements OnInit {

  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  serviciosList;

  constructor(
    public servicesService: ServicesService
  ){}

  ngOnInit() {
    this.servicesService.getServices()
      .subscribe(list => {
        this.servicesService.itemsCopy = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      }
    );
  }

  doReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    this.servicesService.itemsCopy = ev.detail.complete(this.servicesService.itemsCopy);
  }

}
