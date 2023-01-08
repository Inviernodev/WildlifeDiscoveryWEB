import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor(private http: HttpClient) { }

  getChartTest() {
    return this.http.get<any[]>(environment.apiUrl + '/charts/dibujotiempo');
  }

  get(path: string) {
    return this.http.get<any[]>(environment.apiUrl + path);
  }

}
