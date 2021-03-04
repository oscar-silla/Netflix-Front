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
    return this.http.get<Element[]>(this.URL, {headers: headers});
  }

  // Get By Title - Get Method
  /* getElementByTitle(value) {
    this.getAllElements().subscribe(res => {
      return res['title'].includes(value);
    })
  } */

  // Add new - POST Method
  createElement(elementDetail) {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post<Element>(this.URL + "create", elementDetail, {headers: headers});
  }
}
