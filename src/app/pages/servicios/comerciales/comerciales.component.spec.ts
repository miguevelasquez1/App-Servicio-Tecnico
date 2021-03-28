import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComercialesComponent } from './comerciales.component';

describe('ComercialesComponent', () => {
  let component: ComercialesComponent;
  let fixture: ComponentFixture<ComercialesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComercialesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComercialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
