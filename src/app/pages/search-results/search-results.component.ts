import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pagination, UserListItem } from 'src/app/constants/interfaces';
import { UserService } from 'src/app/services/API/user.service';
import { Subscription, map } from 'rxjs';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  searchResults!: Pagination<UserListItem>;
  sub!: Subscription;
  loading = false;
  page = 1;
  query!: string;

  constructor(
    private activeRouter: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.activeRouter.queryParams.subscribe((params) => {
      if (params['q'].trim() !== '') {
        this.query = params['q'];
        this.page = 1;
        this.loadResults();
      }
    });
  }

  loadMore() {
    this.page++;
    this.loadResults();
  }

  loadResults() {
    this.loading = true;
    this.sub = this.userService
      .searchByUsername(this.query, this.page)
      .pipe(
        map((value) => {
          if (this.page !== 1) {
            value.results = [...this.searchResults.results, ...value.results];
          }
          return value;
        })
      )
      .subscribe({
        next: (value) => {
          console.log(value);
          this.searchResults = value;
          this.loading = false;
        },
        error: (err) => {
          console.log(err);
          this.loading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
