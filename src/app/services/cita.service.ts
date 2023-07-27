import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { AuthService } from "./auth.service";
const Swal = require('sweetalert2');

@Injectable()
export class CitaService {
    url: string = 'http://localhost:3000/api/cita';

    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    getCitas(email: any, proximas: boolean, valoradas: boolean): Observable<any> {
        return this.httpClient.get(this.url, {params: { email : email, proximas: proximas, valoradas: valoradas } });
    }

    getResenas(email: any): Observable<any> {
        return this.httpClient.get(this.url+'/resena', { params: { email : email } });
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

    postCita(newCita: any): Observable<any> {
        return this.httpClient.post(this.url, newCita).pipe(tap(
            (res) => {
                if(res){
                    console.log(res);
                } 
            }
        ))

    }

    reservarCita(cita: any): Observable<any> { //para reservar cita
        let usuario = JSON.parse(localStorage.getItem('usuario')!).email;
        return this.httpClient.post(this.url+'/reserva', {usuario, cita}).pipe(tap(
            (res) => {
                if(res){
                    console.log(res);
                } 
            }
        ))
    }

}