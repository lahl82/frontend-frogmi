import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  public URL = '/earthquake-monitor-api'

  constructor() { }
}
