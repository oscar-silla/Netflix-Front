import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ElementService {

  URL: string = "http://localhost:3000/films/"

  constructor(private http: HttpClient) { }

  // Get All - Get Method
  getAllElements() {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get<Element[]>(this.URL, { headers: headers });
  }

  // Add new - POST Method
  createElement(elementDetail) {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post<Element>(this.URL + "create", elementDetail, { headers: headers });
  }

  // Edit Element - PUT Method
  updateElement(id, elementDetail) {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put(this.URL + `update/${id}`, elementDetail, { headers: headers });
  }

  // Delete Element - Delete Method
  deleteElement(id) {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.delete(this.URL + `delete/${id}`, {headers: headers});
  }
}
