import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  connectionString = "https://localhost:44339/api/";
  constructor(
    private http: HttpClient,
    private db: DatabaseService

  ) {

  }

  async getAll() {
    this.db.showProgress = true;
    await this.delay(1000);// delay ekledim progress bar'ın gözükmesi için
    const response: any = await firstValueFrom(
      await this.getAllReq()
    ).catch(
      async (err: any) => {
        //hata mesajı verilebilir
      });
    if (response) {
      this.db.showProgress = false;
      this.db.tableData = response;
    }
  }



  async getFiltered() {
    this.db.showProgress = true;
    await this.delay(1000);// delay ekledim progress bar'ın gözükmesi için
    const response: any = await firstValueFrom(
      await this.getFilteredReq()
    ).catch(
      async (err: any) => {
        //hata mesajı verilebilir
      });
    if (response) {
      this.db.showProgress = false;
      this.db.tableData = response;
    }
  }
  async getFilteredWithTitle(title: string) {
    this.db.showProgress = true;
    await this.delay(1000);// delay ekledim progress bar'ın gözükmesi için
    const response: any = await firstValueFrom(
      await this.getFilteredWithTitleReq(title)
    ).catch(
      async (err: any) => {
        //hata mesajı verilebilir
      });
    if (response) {
      this.db.showProgress = false;
      this.db.tableData = response;
    }
  }

  async getAllReq() {
    const newPath = this.connectionString + 'Advert/GetAllAdverts';
    return this.http.get<any>(newPath);
  }
  async getFilteredReq() {
    const newPath = this.connectionString + 'Advert/GetFilteredAdverts';
    return this.http.post<any>(newPath, this.db.filterRequest);
  }
  async getFilteredWithTitleReq(title: string) {
    const newPath = this.connectionString + 'Advert/GetFilterAndTitle/' + title;
    return this.http.post<any>(newPath, this.db.filterRequest);
  }


  delay(ms: number) { // delay ekledim progress bar'ın gözükmesi için
    return new Promise(resolve => setTimeout(resolve, ms));
  }


}
