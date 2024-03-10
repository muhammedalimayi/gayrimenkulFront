import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { DatabaseService } from './services/database/database.service';
import { ConnectionService } from './services/connection/connection.service';
interface City {
  name: string,
  code: string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']

})

export class AppComponent {
  title = 'exam';
  @ViewChild(MatAccordion) accordion: MatAccordion | undefined;

  minPrice: number | undefined;
  maxPrice: number | undefined;

  status = {
    name: 'Tümü',
    completed: false,
    color: 'primary',
    subtasks: [
      { name: 'Kiralık', completed: false, color: 'accent', type: 0 },
      { name: 'Satılık', completed: false, color: 'primary', type: 1 }

    ],
    allComplete: false
  };

  fitment = {
    name: 'Tümü',
    completed: false,
    color: 'primary',
    subtasks: [
      { name: 'Eşyalı', completed: false, color: 'primary', type: 0 },
      { name: 'Eşyasız', completed: false, color: 'accent', type: 1 }
    ],
    allComplete: false
  };


  constructor(
    public router: Router,
    public db: DatabaseService,
    public connection: ConnectionService
  ) {
    this.router.navigate(['/mainPage']);
    this.checkRequest()
    this.connection.getAll();
  }

  someComplete(type: number): boolean {
    if (type == 1) {
      if (this.status.subtasks == null) {
        return false;
      }
      return this.status.subtasks.filter(t => t.completed).length > 0 && !this.status.allComplete;
    }
    else {
      if (this.fitment.subtasks == null) {
        return false;
      }
      return this.fitment.subtasks.filter(t => t.completed).length > 0 && !this.fitment.allComplete;
    }

  }

  setAll(completed: boolean, type: number) {
    if (type == 1) {
      this.status.allComplete = completed;
      if (this.status.subtasks == null) {
        return;
      }
      this.status.subtasks.forEach(t => (t.completed = completed));
    }
    else {
      this.fitment.allComplete = completed;
      if (this.fitment.subtasks == null) {
        return;
      }
      this.fitment.subtasks.forEach(t => (t.completed = completed));
    }
  }

  updateAllComplete(type: number) {
    if (type == 1) {
      this.status.allComplete = this.status.subtasks != null && this.status.subtasks.every(t => t.completed);
    }
    else {
      this.fitment.allComplete = this.fitment.subtasks != null && this.fitment.subtasks.every(t => t.completed);
    }
  }



  checkRequest() {
    let request: any = {}
    if (this.minPrice) {
      request.minPrice = this.minPrice;
      request.filterByMinPrice = true;
    }
    if (this.maxPrice) {
      request.maxPrice = this.maxPrice;
      request.filterByMaxPrice = true;
    }
    const fitment = this.fitment.subtasks.find(o => o.completed == true)
    if (fitment != null) {
      request.fitmentList = this.fitment.subtasks.filter(o => o.completed == true).map(o => o.type);;
      request.filterByFitment = true;
    }
    const status = this.status.subtasks.find(o => o.completed == true)
    if (status != null) {
      request.statusList = this.status.subtasks.filter(o => o.completed == true).map(o => o.type);;
      request.filterByStatus = true;
    }
    this.db.filterRequest = request;
    this.getFiltered();
  }


  getFiltered() {
    this.connection.getFiltered();
  }








}

