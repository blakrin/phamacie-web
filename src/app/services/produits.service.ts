import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';

import {Produit,RootObject} from '../../app/model/produit';
import {Environment} from "../environment/environment"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {

  constructor(private router: Router,
    private http: HttpClient) { }

    /**
     * 
     * @param page 
     * @param size 
     */
    getProduitPage(page : string, size : string) {
      const params = new HttpParams();
      params.append('page',page).append('size', size)
      console.log("call backend");
      return this.http.get<string>(`http://localhost:8080/api/produits?page=0&size=10`);
    }

    /**
   * 
   * @param data 
   */
  createProduit (data): Observable<HttpResponse<Produit>> {
    const href = 'http://localhost:8080/api/produits';
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    return this.http.post<HttpResponse<Produit>>(href, data, {headers: headers});
  }


  getProduitsPage(sort: string, order: string, page: number): Observable<RootObject> {
    const href = 'http://localhost:8080/api/produits';
    const requestUrl =
        `${href}?page=${page}&size=10`;

    return this.http.get<RootObject>(requestUrl);
  }


  getProduitsSearchPage(search: string, page: number): Observable<RootObject> {
    const href = 'http://localhost:8080/api/produits/search';
    const requestUrl = `${href}/${search}?page=${page}&size=10`;
    return this.http.get<RootObject>(requestUrl);
  }
}
