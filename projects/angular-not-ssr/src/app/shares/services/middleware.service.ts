import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { environment } from '../../../environments/environment'
import { NEVER, Observable, Subject, catchError, filter, tap, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MiddlewareService {

  private http : HttpClient;

  constructor(private injector: Injector) {
    this.http = this.injector.get(HttpClient);
  }

  callApiFn(
    url:string,
    method:string,
    body:any={},
    headers:any = {},
    bypassToken:boolean = false,
    urlOther:boolean = false,
    customError:boolean = false
  ): Observable<any>{
    let callApi = new Observable()
    if(method=='get'){
      callApi = this.http.get<any>(urlOther ? url : environment.api_url+url,{
        headers : headers
      })
    }else if(method=='post'){
      callApi =  this.http.post<any>(urlOther ? url : environment.api_url+url,body,{
        headers : headers
      })
    }else if(method=='put'){
      callApi =  this.http.put<any>(urlOther ? url : environment.api_url+url,body,{
        headers : headers
      })
    }else if(method=='delete'){
      callApi =  this.http.delete<any>(urlOther ? url : environment.api_url+url,{
        headers : headers,
        body:body
      })
    }
    return callApi.pipe(
      catchError((error)=>{
        if(customError==false){
          console.log('api error ===>',error)
          return NEVER
        }else{
          return throwError(() => error)
        }
      }),
      // tap((response)=>{
      //   if(bypassToken==false){
      //     console.log("MiddlewareService  tap  response:", response)
      //   }
      // }),
      // filter((response:any)=>{
      //   return response?.response_code == 200
      // }),

    )
  }
}
