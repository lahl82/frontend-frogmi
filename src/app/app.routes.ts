import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CommentNewComponent } from './components/comments/comment-new/comment-new.component';
import { CommentsListComponent } from './components/comments/comments-list/comments-list.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'comment-new', component: CommentNewComponent },
  { path: 'features/:serviceId', component: CommentsListComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
