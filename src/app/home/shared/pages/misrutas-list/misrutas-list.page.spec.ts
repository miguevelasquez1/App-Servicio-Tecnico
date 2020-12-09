import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MisrutasListPage } from './misrutas-list.page';

describe('MisrutasListPage', () => {
  let component: MisrutasListPage;
  let fixture: ComponentFixture<MisrutasListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisrutasListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MisrutasListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
