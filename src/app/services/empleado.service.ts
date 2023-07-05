import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class EmpleadoService {
    url: string = 'http://localhost:3000/api/empleado';

    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    getEmpleados(email: any): Observable<any> {
        return this.httpClient.get(this.url, {params: { email : email } });
    }

    postEmpleado(newEmpleado: any): Observable<any> {
        debugger
        return this.httpClient.get(this.url, newEmpleado).pipe(tap(
            (res) => {
                if(res){
                    console.log(res);
                } 
            }
        ))

    }

}