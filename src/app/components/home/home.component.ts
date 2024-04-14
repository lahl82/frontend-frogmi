import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { FeaturesService } from '../../services/api/features.service';
import { IFeaturesPage } from '../../models/ifeatures-page.model';
import { IFeature } from '../../models/ifeature.model';
import { StoreContextService } from '../../store/store-context.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  searchForm: FormGroup
  featuresList: IFeature[] = []
  currentPage = 1
  totalPages: number = 1
  magTypes: string[] = ['md', 'ml', 'ms', 'mw', 'me', 'mi', 'mb', 'mlg']
  magTypeSelected: string = ''
  perPage: number = 25

  message: string = ''
  errorMessage: string = ''
  waiting: boolean = true
  waitingMessage: string = 'Downloading Data. Wait for just a moment please.'
  emptyList = false
  emptyListMessage: string = 'Empty List'
  refreshMessage:  string = 'Backend update request sent'
  displayMessage: boolean = false

  private _apiFeaturesService = inject(FeaturesService)
  private _storeContextService = inject(StoreContextService)

  private _route = inject(ActivatedRoute)
  private form = inject(FormBuilder)

  constructor() {
    this.searchForm = this.form.group({
      mag_type: [''],
      per_page: [this.perPage, Validators.required],
    })
  }

  ngOnInit(): void {
    this.fetchFeaturesList()

    this._route.params.subscribe({
      next: (params: Params) => {
        this.message = params['message']
      }
    })

    this.searchForm.get('mag_type')?.valueChanges.subscribe(value => {
      this.magTypeSelected = value
      this.fetchFeaturesList()
    })

    this.searchForm.get('per_page')?.valueChanges.subscribe(value => {
      this.perPage = value
    })
  }

  fetchFeaturesList() {
    this.waiting = true

    this.currentPage = this._storeContextService.getCurrentPage()

    this._apiFeaturesService.getFeaturesPage(this.currentPage, this.magTypeSelected, this.perPage).subscribe({
      next: (featuresPage: IFeaturesPage) => {
        this.featuresList = featuresPage.data
        this.totalPages = Number(featuresPage.pagination?.total)
        this.updateCurrentPage(Number(featuresPage.pagination?.current_page))

        if (featuresPage.data.length === 0) {
          this.emptyList = true
        } else {
          this.emptyList = false
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

  pagesRange() {
    let arraySize = 10
    let firstValue = this.currentPage + 1 - ((this.currentPage % 10)?this.currentPage % 10:10)

    if (this.totalPages < 10) {
      arraySize = this.totalPages
    }

    if ((firstValue + arraySize) > this.totalPages) {
      arraySize = this.totalPages - firstValue + 1
    }


    let res = new Array(arraySize).fill(firstValue).map((n, index) => {
      return n + index
    })

    return res
  }

  changePage(pageNumber: number) {
    if (pageNumber > 0 && pageNumber <= this.totalPages) {
      this._storeContextService.setCurrentPage(pageNumber)

      this.fetchFeaturesList()
    }
  }

  updateCurrentPage(currentPage: number) {
    if (currentPage == 0) {
      currentPage += 1
    }

    this.currentPage = currentPage
    this._storeContextService.setCurrentPage(currentPage)
  }

  refreshBack() {
    this.displayMessage = true

    this.waiting = true
    this._apiFeaturesService.refreshFeaturesPage().subscribe({
      next: (response: any) => {
        console.log(`all ok with refresh: ${response}`)
        this.waiting = false
      },
      error: (error: any) => {
        console.log(error)
        this.errorMessage = 'Something went wrong. It is not possible to get data right now.'

        this.waiting = false
      }
    })
  }

  refreshFront() {
    this.updateCurrentPage(1)

    this.fetchFeaturesList()
  }

  closeMessage() {
    this.displayMessage = false
  }

  hasErrors(controlName: string, errorType: string) {
    return this.searchForm.get(controlName)?.hasError(errorType) && this.searchForm.get(controlName)?.touched
  }
}
