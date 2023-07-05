import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class ResenaService {
    url: string = 'http://localhost:3000/api/resena';

    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    getResenas(nombre: any): Observable<any> {
        return this.httpClient.get(this.url, {params: { nombre : nombre } });
    }

    postResena(newResena: any): Observable<any> {
        return this.httpClient.post(this.url, newResena).pipe(tap(
            (res) => {
                if(res){
                    console.log(res);
                } 
            }
        ))

    }

}