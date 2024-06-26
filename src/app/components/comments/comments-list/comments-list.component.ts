import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FeaturesService } from '../../../services/api/features.service';
import { IComment } from '../../../models/icomment.model';

@Component({
  selector: 'app-comments-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './comments-list.component.html',
  styleUrl: './comments-list.component.css'
})
export class CommentsListComponent  implements OnInit{

  featureId?: number
  commentsList?: IComment[]
  message: string = ''
  errorMessage: string = ''
  waiting: boolean = true
  waitingMessage: string = 'Loading... Please wait'
  emptyList = false
  emptyListMessage: string = 'Empty Comments List'

  private _route = inject(ActivatedRoute)
  private _router = inject(Router)
  private _apiFeatures = inject(FeaturesService)

  color?: string

  ngOnInit(): void {
    this.waiting = true

    this._route.params.subscribe({
      next: (params: Params) => {
        this.featureId = Number(params['featureId'])

        this._apiFeatures.getCommentsByFeatureId(this.featureId).subscribe({
          next: (data: IComment[]) => {
            this.commentsList = data

            if (this.commentsList.length === 0) {
              this.emptyList = true
            }

            this.waiting = false
          },
          error: (error: any) => {
            console.log(error)
            this.errorMessage = 'Something went wrong. It is not possible to get data right now.'

            this.waiting = false
          }
        })
      }
    })
  }

  back(): void {
    this._router.navigate(['**'])
  }
}
