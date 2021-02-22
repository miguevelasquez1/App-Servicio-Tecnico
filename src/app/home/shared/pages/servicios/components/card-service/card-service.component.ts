import { Component, ElementRef, ViewChildren, QueryList, OnInit, AfterViewInit,  ChangeDetectorRef, Renderer2 } from '@angular/core';
import { GestureController, IonCard } from '@ionic/angular';
import { Observable, of } from 'rxjs';

interface Item {
  id: string;
  service: string;
}

@Component({
  selector: 'app-card-service',
  templateUrl: './card-service.component.html',
  styleUrls: ['./card-service.component.scss'],
})
export class CardServiceComponent implements OnInit, AfterViewInit {

  @ViewChildren(IonCard, {read: ElementRef}) cards: QueryList<ElementRef>;

  constructor(
    private gestureCtrl: GestureController,
    private cd: ChangeDetectorRef,
    private renderer2: Renderer2
  ) {
  }

  filterItems: string;
  items: Item[] = [
    {id: '0', service: 'pizza'},
    {id: '1', service: 'crepes & waffles'},
    {id: '2', service: 'hamburguer'}
  ];
  itemTemporal: Item;
  indexItemTemporal: number;
  cardTemporal: ElementRef;

  items$: Observable<Item[]> = of(this.items);

  ngOnInit() {}

  ngAfterViewInit() {
    const cardArray = this.cards.toArray();
    this.cards.changes.subscribe(() => this.cardTemporal = this.cards.toArray()[this.indexItemTemporal] );
    this.useLongPress(cardArray);
  }

  useLongPress(cardArray) {
    for (const card of cardArray) {

      const { nativeElement } = card;

      const gesture = this.gestureCtrl.create({
        el: nativeElement,
        gestureName: 'long-press',
        onStart: e => {
          nativeElement.style.zIndex = 1000;
          const itemActual = this.items.find(itemFilter => itemFilter.service === card.nativeElement.innerText);
          console.log(card);
          this.indexItemTemporal = this.items.indexOf(itemActual);
          this.itemTemporal = { id: 'x', service: itemActual.service };
          this.items.splice(this.indexItemTemporal, 0, this.itemTemporal);
          this.cd.detectChanges();
        },
        onMove: e => {
          nativeElement.style.transform = `translateY(${e.deltaY}px)`;
          this.cardTemporal.nativeElement.style.opacity = '50%';
          if (e.deltaY >= 88) {
            console.log('xd');
            this.items.splice(this.indexItemTemporal, 1);
            this.cd.detectChanges();
          }
          // this.cardTemporal.nativeElement.style.transform = `translateY(${e.deltaY + 10}px)`;
        },
        onEnd: e => {

          this.indexItemTemporal = this.items.indexOf(this.itemTemporal);
          this.items.splice(this.indexItemTemporal, 1);
          this.cd.detectChanges();

          nativeElement.style.zIndex = '';

          const spaces: any = e.deltaY / 88;

          if (e.deltaY <= 88 && e.deltaY > -88) {
            e.deltaY = 0;
            nativeElement.style.transform = `translateY(${e.deltaY}px)`;
          }
        }
      });
      gesture.enable();
    }
  }

  getItems(e) {
    this.filterItems = e.target.value;
  }
}
