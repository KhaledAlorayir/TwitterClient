import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { UserListCardComponent } from './components/user-list-card/user-list-card.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { HomeComponent } from './pages/home-page/home.component';
import { HeroComponent } from './pages/hero/hero.component';
import { UserComponent } from './pages/user/user.component';
import { InterceptorService } from './services/API/interceptor.service';
import { UserHeaderComponent } from './components/user-header/user-header.component';
import { UserTweetsComponent } from './components/user-tweets/user-tweets.component';
import { UserLikesComponent } from './components/user-likes/user-likes.component';
import { UserFollowersComponent } from './components/user-followers/user-followers.component';
import { UserFollowingComponent } from './components/user-following/user-following.component';
import { TweetListComponent } from './components/tweet-list/tweet-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TweetCardComponent } from './components/tweet-card/tweet-card.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TweetPageComponent } from './pages/tweet-page/tweet-page.component';
import { TweetDeleteComponent } from './components/tweet-delete/tweet-delete.component';
import { TweetReplayComponent } from './components/tweet-replay/tweet-replay.component';
import { TweetLikesComponent } from './components/tweet-likes/tweet-likes.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { SubmitTweetComponent } from './components/submit-tweet/submit-tweet.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { ChangeUsernameComponent } from './components/change-username/change-username.component';
import { ChangeBioComponent } from './components/change-bio/change-bio.component';
import { ChangeImageComponent } from './components/change-image/change-image.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchResultsComponent,
    UserListCardComponent,
    AuthPageComponent,
    AlertsComponent,
    LoadingIndicatorComponent,
    HomeComponent,
    HeroComponent,
    UserComponent,
    UserHeaderComponent,
    UserTweetsComponent,
    UserLikesComponent,
    UserFollowersComponent,
    UserFollowingComponent,
    TweetListComponent,
    TweetCardComponent,
    TweetPageComponent,
    TweetDeleteComponent,
    TweetReplayComponent,
    TweetLikesComponent,
    UserCardComponent,
    UserListComponent,
    TimelineComponent,
    SubmitTweetComponent,
    SettingsPageComponent,
    ChangeUsernameComponent,
    ChangeBioComponent,
    ChangeImageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    InfiniteScrollModule,
    FormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
