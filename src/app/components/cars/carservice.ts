import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getCarIdentifier, ICar } from './car.model';




export type EntityResponseType = HttpResponse<ICar>;
export type EntityArrayResponseType = HttpResponse<ICar[]>;

@Injectable({ providedIn: 'root' })
export class CarService {
  protected resourceUrl = 'http://localhost:8181/api/cars';

  constructor(protected http: HttpClient) {}

  create(car: ICar): Observable<EntityResponseType> {
    return this.http.post<ICar>(this.resourceUrl, car, { observe: 'response' });
  }


  update(car: ICar): Observable<EntityResponseType> {
    return this.http.put<ICar>(`${this.resourceUrl}/${getCarIdentifier(car) as number}`, car, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICar>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }


  findAll(req?: any): Observable<EntityArrayResponseType> {
 
    return this.http.get<ICar[]>(this.resourceUrl, {  observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}