import { environment } from 'src/environments/environments';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Subs, Subscriber } from '../interfaces/list-all-subscribers.interface';

@Injectable({
  providedIn: 'root',
})
export class listAllSubsService {
  Url: string = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}
  public listAllSubs(): Observable<Subscriber[]> {
    return this.httpClient.get<Subscriber[]>(`${this.Url}/subscribers`);
  }
  public detailSub(id: number): Observable<Subscriber> {
    return this.httpClient.get<Subscriber>(`${this.Url}/subscribers/${id}`);
  }
  public save(subscriber: Subs): Observable<Subs> {
    return this.httpClient.post<Subs>(`${this.Url}/subscribers`, subscriber);
  }
  public update(id: number, subscriber: Subscriber): Observable<Subscriber> {
    return this.httpClient.put<Subscriber>(
      `${this.Url}/subscribers/${id}`,
      subscriber
    );
  }
  public delete(id: number): Observable<Subscriber> {
    return this.httpClient.delete<Subscriber>(`${this.Url}/subscribers/${id}`);
  }
}
