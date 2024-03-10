import { Component } from '@angular/core';
import { ConnectionService } from 'src/app/services/connection/connection.service';
import { DatabaseService } from 'src/app/services/database/database.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  query = "";
  constructor(
    public db: DatabaseService,
    private connection: ConnectionService

  ) {

  }

  globalSearch(): any {
    if (!this.query) return this.connection.getFiltered();
    this.connection.getFilteredWithTitle(this.query)
  }
}
