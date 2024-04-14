import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { IComment } from '../../models/icomment.model';
import { IFeaturesPage } from '../../models/ifeatures-page.model';
import { IFeature } from '../../models/ifeature.model';

@Injectable({
  providedIn: 'root'
})
export class FeaturesService {

  private _httpClient = inject(HttpClient)
  private _base = inject(BaseService)
  private fullEndpoint = ''

  constructor() {
    let endpoint = this.constructor.name.slice(1, -7).toLowerCase()

    this.fullEndpoint = `${this._base.URL}/${endpoint}`
  }

  public getFeaturesPage(currentPage: number, magTypeSelected: string, perPage: number): Observable<IFeaturesPage> {
    let searchCriteria: string = ''
    let perPageParameter: string = `&per_page=${perPage}`

    if (magTypeSelected !== '') {
      searchCriteria = `&mag_type=${magTypeSelected}`
    }

    return this._httpClient.get<IFeaturesPage>(`${this.fullEndpoint}.json?page=${currentPage + searchCriteria + perPageParameter}`)
  }

  public getFeature(featureId: number): Observable<IFeature> {
    return this._httpClient.get<IFeature>(`${this.fullEndpoint}/${featureId}.json`)
  }

  public refreshFeaturesPage(): Observable<any> {
    return this._httpClient.get<any>(`${this.fullEndpoint}/refresh.json`)
  }

  public getCommentsByFeatureId(featureId: number): Observable<IComment[]> {
    return this._httpClient.get<IComment[]>(`${this.fullEndpoint}/${featureId}/comments.json`)
  }

  public postComment(featureID: number, commentPostData: any): Observable<IComment> {
    return this._httpClient.post<IComment>(`${this.fullEndpoint}/${featureID}/comments.JSON`, commentPostData)
  }
}
