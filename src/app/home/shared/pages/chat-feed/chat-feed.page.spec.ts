import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChatFeedPage } from './chat-feed.page';

describe('ChatFeedPage', () => {
  let component: ChatFeedPage;
  let fixture: ComponentFixture<ChatFeedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatFeedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatFeedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
