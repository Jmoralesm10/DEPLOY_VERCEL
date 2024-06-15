import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { FormGroup } from '@angular/forms';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  baseurl: string = environment.SERVER_URL;

  constructor(private http: HttpClient, private loginService: LoginService) { }

    // Http Headers
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.currentUserValue.token}`
      })
    }

    GetRptEstadistico(rptEstaMensual: FormGroup) {
      /*Get del servicio */
      return this.http.post<any>(this.baseurl + "rptEstadisticoMesual", rptEstaMensual, this.httpOptions)
        .pipe(map(msgRes => {
          // login successful if there's a jwt token in the response
          if (msgRes && msgRes.codError == "200") {
            //console.log(msgRes);
            //this.currentResponseMsgSubject.next(msgRes);
            return msgRes;
          }
          return msgRes;
        }));
    }



}
