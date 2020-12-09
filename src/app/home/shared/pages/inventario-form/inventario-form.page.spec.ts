import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InventarioFormPage } from './inventario-form.page';

describe('InventarioFormPage', () => {
  let component: InventarioFormPage;
  let fixture: ComponentFixture<InventarioFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventarioFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InventarioFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
