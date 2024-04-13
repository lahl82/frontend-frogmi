import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreContextService {

  getCurrentPage(): number {
    const lsCurrentPage: string = localStorage.getItem('currentPage') || '1'
    const currentPage: number = JSON.parse(lsCurrentPage)

    return currentPage
  }

  setCurrentPage(currentPage: number) {
    localStorage.setItem('currentPage', JSON.stringify(currentPage))
  }

  constructor() { }
}
