import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Maths } from 'src/Models/programm.interface';


@Injectable({
  providedIn: 'root'
})

export class BackEndService {
  endpoint = 'http://192.168.200.2:8081/'; //'http://epsana.ddns.net:5000/';
  httpOptions = {
    headers: new HttpHeaders({
     'Content-Type': 'application/json'
    })
 };
  constructor(private http: HttpClient){}

  getProg(cat: any): Observable<Maths[]> {
    return this.http.get<any>('http://192.168.1.104:8081/law_schedule').pipe(
      // eslint-disable-next-line arrow-body-style
      (responseList) => {
        return responseList;
      },
      catchError((error, caught) => {
        this.handleError<Maths[]>('Get Programm', []);

        throw error;
      })
    );
  }

  editProg(data: any): Observable<Maths[]> {
    const body = JSON.stringify(data);
    console.log(body)
    return this.http.post<any>('http://192.168.1.104:8081/law_schedule', body, this.httpOptions);
  }

  private extractData(res: any) {
    let body = res;
    return body;
}

  private handleErrorObservable(error: any) {
    console.error(error.message || error);
    return throwError(error);
}



  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
