import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pagination, UserListItem } from 'src/app/constants/interfaces';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  @Input() users!: Pagination<UserListItem>;
  @Input() fetching!: boolean;
  @Input() emptyText!: string;
  @Input() cont!: HTMLElement;
  @Output('paginate') paginate = new EventEmitter();

  constructor() {}

  load() {
    this.paginate.emit();
  }
  ngOnInit(): void {}
}
