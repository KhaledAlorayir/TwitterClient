import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pagination, Tweet } from 'src/app/constants/interfaces';
@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
})
export class TweetListComponent implements OnInit {
  @Input() tweets!: Pagination<Tweet>;
  @Input() fetching!: boolean;
  @Input() emptyText!: string;
  @Output('paginate') paginate = new EventEmitter();

  constructor() {}

  load() {
    this.paginate.emit();
  }

  ngOnInit(): void {}
}
