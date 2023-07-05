import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class ServicioService {
    url: string = 'http://localhost:3000/api/servicio';

    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    getServicios(email: any): Observable<any> {
        return this.httpClient.get(this.url, {params: { email : email } });
    }

    postServicio(newServicio: any): Observable<any> {
        debugger
        return this.httpClient.post(this.url, newServicio).pipe(tap(
            (res) => {
                if(res){
                    console.log(res);
                } 
            }
        ))

    }

}