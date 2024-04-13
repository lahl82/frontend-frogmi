import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { IComment } from '../../models/icomment.model';
import { IFeaturesPage } from '../../models/ifeatures-page.model';

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

  public getFeaturesPage(currentPage: number): Observable<IFeaturesPage> {
    return this._httpClient.get<IFeaturesPage>(`${this.fullEndpoint}.json?page=${currentPage}`)
  }

  public refreshFeaturesPage(currentPage: number): Observable<IFeaturesPage> {
    return this._httpClient.get<IFeaturesPage>(`${this.fullEndpoint}/refresh.json?page=${currentPage}`)
  }

  public getCommentsByFeatureId(featureId: number): Observable<IComment[]> {
    return this._httpClient.get<IComment[]>(`${this.fullEndpoint}/${featureId}/comments.json`)
  }
}
