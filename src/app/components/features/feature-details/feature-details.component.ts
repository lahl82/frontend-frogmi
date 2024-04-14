import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FeaturesService } from '../../../services/api/features.service';
import { IFeature } from '../../../models/ifeature.model';

@Component({
  selector: 'app-feature-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './feature-details.component.html',
  styleUrl: './feature-details.component.css'
})
export class FeatureDetailsComponent  implements OnInit{

  featureId?: number
  feature: IFeature = {}
  message: string = ''
  errorMessage: string = ''
  waiting: boolean = true
  waitingMessage: string = 'Loading... Please wait'

  private _route = inject(ActivatedRoute)
  private _router = inject(Router)
  private _apiFeatures = inject(FeaturesService)

  color?: string

  ngOnInit(): void {
    this.waiting = true

    this._route.params.subscribe({
      next: (params: Params) => {
        this.featureId = Number(params['featureId'])

        this._apiFeatures.getFeature(this.featureId).subscribe({
          next: (data: IFeature) => {
            this.feature = data

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
