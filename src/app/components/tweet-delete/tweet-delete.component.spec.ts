import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetDeleteComponent } from './tweet-delete.component';

describe('TweetDeleteComponent', () => {
  let component: TweetDeleteComponent;
  let fixture: ComponentFixture<TweetDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TweetDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TweetDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
