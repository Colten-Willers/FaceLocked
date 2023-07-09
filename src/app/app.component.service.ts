import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  private apiUrl = "http://127.0.0.1:5000"; //'http://localhost:5000/';

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/items`); //`${this.apiUrl}/items`
  }

  sendData(data: any): Observable<any>{
    data = {"image": data}
    // const jsonData = JSON.parse(data);
    console.log(data);
    return this.http.post(`${this.apiUrl}/`, data); //.toString();
  }
}