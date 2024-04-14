import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CommentNewComponent } from './components/comments/comment-new/comment-new.component';
import { CommentsListComponent } from './components/comments/comments-list/comments-list.component';
import { FeatureDetailsComponent } from './components/features/feature-details/feature-details.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'feature/:featureId', component: FeatureDetailsComponent },
  { path: 'comment-new/:featureId', component: CommentNewComponent },
  { path: 'comments/:featureId', component: CommentsListComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
