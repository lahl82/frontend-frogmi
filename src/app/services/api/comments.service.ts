import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { IFeature } from '../../models/ifeature.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private _httpClient = inject(HttpClient)
  private _base = inject(BaseService)
  private fullEndpoint = ''

  constructor() {
    let endpoint = this.constructor.name.slice(1, -7).toLowerCase()

    this.fullEndpoint = `${this._base.URL}/${endpoint}`
  }

  public postComment(commentPostData: any): Observable<IFeature> {
    //const serviceParams = { service: servicePostData }
    return this._httpClient.post<IFeature>(`${this.fullEndpoint}`, commentPostData)
  }
}
