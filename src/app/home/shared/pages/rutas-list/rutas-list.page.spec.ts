import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RutasListPage } from './rutas-list.page';

describe('RutasListPage', () => {
  let component: RutasListPage;
  let fixture: ComponentFixture<RutasListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutasListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RutasListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
