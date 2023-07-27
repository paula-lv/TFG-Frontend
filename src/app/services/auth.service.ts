import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserI } from "../models/user";
import { JwtResponseI } from "../models/jwt-response";
import { tap } from "rxjs/operators";
import { Observable, BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class AuthService {
    AUTH_SERVER: string = 'http://localhost:3000';
    authSubject = new BehaviorSubject(false);
    private token: string = '';

    constructor(private httpClient: HttpClient, private router: Router, private cookieService: CookieService) { }

    register(user: UserI): Observable<JwtResponseI> {
        return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}/register`, user).pipe(tap(
            (res: JwtResponseI) => {
                if(res){
                    this.router.navigateByUrl('/');
                } 
            }
        ));
    }

    login(user: any): Observable<JwtResponseI> {
        let usuario = {email: user.email, psw: user.psw};

        return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}/login`, usuario, { withCredentials: true}).pipe(tap(
            (res: JwtResponseI) => {
                if(res){
                    // guardar token
                    localStorage.setItem('usuario', JSON.stringify(res.dataUser));
                    if(res.dataUser.tipo == 1)
                    {
                        environment.tipoUsuario = 1;
                        this.router.navigateByUrl('/tuPerfil');
                    } else {
                        environment.tipoUsuario = 0;
                        this.router.navigateByUrl('/');
                    }
                    
                } 
            }
        ));
    }

    getInfoUser(user:any): Observable<any> {
        return this.httpClient.get(`${this.AUTH_SERVER}/usuario/`+user, { withCredentials: true});
    }

    logout(): void {
        this.cookieService.delete('access-token');
        this.cookieService.delete('tipo-usuario');
        localStorage.removeItem('usuario');
        this.router.navigateByUrl('/login');
    }
}