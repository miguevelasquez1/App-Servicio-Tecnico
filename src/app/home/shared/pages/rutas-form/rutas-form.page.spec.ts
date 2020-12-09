import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RutasFormPage } from './rutas-form.page';

describe('RutasFormPage', () => {
  let component: RutasFormPage;
  let fixture: ComponentFixture<RutasFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutasFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RutasFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
