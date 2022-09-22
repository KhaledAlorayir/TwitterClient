import { Component, OnInit, Input } from '@angular/core';
import { UserListItem } from 'src/app/constants/interfaces';

@Component({
  selector: 'app-user-list-card',
  templateUrl: './user-list-card.component.html',
})
export class UserListCardComponent implements OnInit {
  @Input('user') user!: UserListItem;

  constructor() {}

  ngOnInit(): void {}
}
