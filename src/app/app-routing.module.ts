import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFollowersComponent } from './components/user-followers/user-followers.component';
import { UserFollowingComponent } from './components/user-following/user-following.component';
import { UserLikesComponent } from './components/user-likes/user-likes.component';
import { UserTweetsComponent } from './components/user-tweets/user-tweets.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeGuard } from './guards/home.guard';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { HeroComponent } from './pages/hero/hero.component';
import { HomeComponent } from './pages/home-page/home.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { TweetPageComponent } from './pages/tweet-page/tweet-page.component';
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
  { path: '', component: HeroComponent },
  { path: 'home', component: HomeComponent, canActivate: [HomeGuard] },
  { path: 'search', component: SearchResultsComponent },
  { path: 'auth', component: AuthPageComponent, canActivate: [AuthGuard] },
  { path: 'tweet/:id', component: TweetPageComponent },
  {
    path: 'user/:id',
    component: UserComponent,
    children: [
      { path: '', component: UserTweetsComponent },
      { path: 'likes', component: UserLikesComponent },
      { path: 'followers', component: UserFollowersComponent },
      { path: 'following', component: UserFollowingComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
