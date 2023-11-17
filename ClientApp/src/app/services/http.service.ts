import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  post<T = any>(api: string, body: any = {}) {
    if (!location.origin.includes('localhost:4200'))
      return this.httpClient.post<T>(
        'https://api-rest-mpmg.vercel.app' + '/api/' + api,
        body
      );
    else {
      return this.httpClient.post<T>(
        'http://localhost:5001' + '/api/' + api,
        body
      );
    }
  }

  get(api: string) {
    if (!location.origin.includes('localhost:4200'))
      return this.httpClient.get(
        'https://api-rest-mpmg.vercel.app' + '/api/' + api
      );
    else {
      return this.httpClient.get('http://localhost:5001' + '/api/' + api);
    }
  }

  delete<T = any>(api: string, params: any) {
    if (!location.origin.includes('localhost:4200'))
      return this.httpClient.delete<T>(
        'https://api-rest-mpmg.vercel.app' + '/api/' + api + params
      );
    else {
      return this.httpClient.delete<T>(
        'http://localhost:5001' + '/api/' + api + params
      );
    }
  }
}
