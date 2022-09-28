import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tweet-page',
  templateUrl: './tweet-page.component.html',
})
export class TweetPageComponent implements OnInit {
  constructor(private activeRouter: ActivatedRoute) {}

  ngOnInit(): void {
    this.activeRouter.params.subscribe(({ id }) => {
      console.log(id);
    });
  }
}
