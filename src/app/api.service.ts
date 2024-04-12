import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getvalue() {
    return this.http.get('/api/patch');
  }

  addSummary(data: any) {
    return this.http.post('/api/insert', data);
  }

  getSumary(param:any) {
    return this.http.post('/api/summary',param);
  }

  update(param: any) {
    return this.http.post('/api/update', param);
  }
  deletedData(id: any) {
    return this.http.get('api/deleteData/' + id);
  }
}
