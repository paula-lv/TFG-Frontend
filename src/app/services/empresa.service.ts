import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class EmpresaService {
    url: string = 'http://localhost:3000/api/empresa';

    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    getEmpresas(servicio: any, pobl: any, prov: any, valor: any, fechaDesde:any, fechaHasta: any, todas: boolean): Observable<any> {
        return this.httpClient.get(this.url, { params: { servicio : servicio, pobl: pobl, prov: prov, valor: valor, fechaDesde: fechaDesde, fechaHasta: fechaHasta, todas: todas }} );
    }

    getEmpresa(email: any): Observable<any> {
        return this.httpClient.post(this.url+'/obtener', { email: email }).pipe(tap(
            (res) => {
                if(res){
                    console.log(res);
                } 
            }
        ))

        
    }

}