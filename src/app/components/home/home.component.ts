import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { FeaturesService } from '../../services/api/features.service';
import { IFeaturesPage } from '../../models/ifeatures-page.model';
import { IFeature } from '../../models/ifeature.model';
import { StoreContextService } from '../../store/store-context.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  featuresList: IFeature[] = []
  currentPage: number = 1
  totalPages: number = 1

  message: string = ''
  errorMessage: string = ''
  waiting: boolean = true
  waitingMessage: string = 'Downloading Data. Wait for just a moment please.'
  emptyList = false
  emptyListMessage: string = 'Empty List'

  private _apiFeaturesService = inject(FeaturesService)
  private _storeContextService = inject(StoreContextService)

  private _route = inject(ActivatedRoute)

  constructor() {
  }

  ngOnInit(): void {
    this.currentPage = this._storeContextService.getCurrentPage()

    this._apiFeaturesService.getFeaturesPage(this.currentPage).subscribe({
      next: (featuresPage: IFeaturesPage) => {
        this.featuresList = featuresPage.data
        this.totalPages = Number(featuresPage.pagination?.total)

        if (this.featuresList.length === 0) {
          this.emptyList = true
        }

        this.waiting = false
      },
      error: (error: any) => {
        console.log(error)
        this.errorMessage = 'Something went wrong. It is not to be possible to get data right now.'

        this.waiting = false
      }
    })

    this._route.params.subscribe({
      next: (params: Params) => {
        this.message = params['message']
      }
    })
  }

  pagesRange() {
    return new Array(this.totalPages);
  }
}
