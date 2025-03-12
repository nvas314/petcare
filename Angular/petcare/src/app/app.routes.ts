import { Routes } from '@angular/router';
import { FoundComponent } from './pages/posts/found/found.component';
import { LostComponent } from './pages/posts/lost/lost.component';
import { MainComponent } from './pages/main/main.component';
import { PostNewComponent } from './pages/posts/post-new/post-new.component';
import { SigninComponent } from './pages/sign-in-up/signin/signin.component';
import { SignupComponent } from './pages/sign-in-up/signup/signup.component';
import { PostCommentsComponent } from './pages/post-comments/post-comments.component';
import { UserGeneralInfoComponent } from './pages/user-general-info/user-general-info.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { ProfessionsComponent } from './pages/professions/professions.component';
import { AnnouncementsComponent } from './pages/announcements/announcements.component';
import { ApplicationsComponent } from './pages/applications/applications.component';
import { UserSettingsComponent } from './pages/user-settings/user-settings.component';
import { UsersComponent } from './pages/users/users.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { InstitutionsComponent } from './pages/institutions/institutions.component';
import { NewApplicationComponent } from './pages/new-application/new-application.component';
import { NewInstitutionComponent } from './pages/institutions/new-institution/new-institution.component';
import { NewAnnouncementComponent } from './pages/announcements/new-announcement/new-announcement.component';
import { SignInUpComponent } from './pages/sign-in-up/sign-in-up.component';
import { AccountComponent } from './pages/account/account.component';
import { UserSearchComponent } from './pages/user-search/user-search.component';
import { OwnPostsComponent } from './pages/own-posts/own-posts.component';
import { EditAccountComponent } from './pages/account/edit-account/edit-account.component';
import { ShowAnnouncementComponent } from './pages/announcements/show-announcement/show-announcement.component';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';

export const routes: Routes = [
  {path:'posts/found' , component:FoundComponent},
  {path:'posts/lost' , component:LostComponent},
  {path:'posts/new' , component:PostNewComponent},
  {path:'login' , component:SignInUpComponent},
  {path:'comments/:id' , component:PostCommentsComponent},
  {path:'user/search' , component:UserSearchComponent},
  {path:'user/:id' , component:UserGeneralInfoComponent},
  {path:'account' , component:AccountComponent},
  {path:'account/settings' , component:UserSettingsComponent},
  {path:'account/edit' , component:EditAccountComponent},
  {path:'messages' , component:MessagesComponent},
  {path:'institutions' , component:InstitutionsComponent},
  {path:'admin/institutions/new' , component:NewInstitutionComponent},
  {path:'admin/announcements/new' , component:NewAnnouncementComponent},
  {path:'professionals' , component:ProfessionsComponent},
  {path:'notifications' , component:NotificationsComponent},
  {path:'announcements' , component:AnnouncementsComponent},
  {path:'announcement/:id' , component:ShowAnnouncementComponent},
  {path:'apps' , component:ApplicationsComponent},
  {path:'new/application' , component:NewApplicationComponent},
  {path:'myposts' , component:OwnPostsComponent},
  {path:'admin/users' , component:UsersComponent},
  {path:'' , component:MainComponent},
  {path:'denied' , component:AccessDeniedComponent},
  {path:'**' , component:NotFoundComponent}
];

