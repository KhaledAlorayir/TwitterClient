import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetReplayComponent } from './tweet-replay.component';

describe('TweetReplayComponent', () => {
  let component: TweetReplayComponent;
  let fixture: ComponentFixture<TweetReplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TweetReplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TweetReplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
