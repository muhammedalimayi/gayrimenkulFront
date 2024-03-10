import { Injectable } from '@angular/core';
import { Advertisement } from 'src/app/models/advertisement';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  tableData = [];
  showProgress = false;
  filterRequest: any;
  constructor() {

  }
}
