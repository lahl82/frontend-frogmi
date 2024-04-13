import { Injectable } from '@angular/core';
import { IFeatureTypes } from '../models/iservice-types.model';

@Injectable({
  providedIn: 'root'
})
export class StoreServiceTypesService {

  serviceTypes: IFeatureTypes[] = []

  constructor() {
  }

  getServiceTypes(): IFeatureTypes[] {
    return this.serviceTypes
  }

  setServiceTypes(serviceTypes: IFeatureTypes[]) {
    this.serviceTypes = serviceTypes
  }
}
