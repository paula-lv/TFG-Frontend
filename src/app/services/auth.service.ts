import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserI } from "../models/user";
import { JwtResponseI } from "../models/jwt-response";
import { tap } from "rxjs/operators";
import { Observable, BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class AuthService {
    AUTH_SERVER: string = 'http://localhost:3000';
    authSubject = new BehaviorSubject(false);
    private token: string = '';

    constructor(private httpClient: HttpClient) { }

    register(user: UserI): Observable<JwtResponseI> {
        return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}/register`,
        user).pipe(tap(
            (res: JwtResponseI) => {
                if(res){
                    // guardar token
                    this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
                } 
            }
        ));
    }

    login(user: any): Observable<JwtResponseI> {
        let usuario = {email: user.email, psw: user.psw};
        return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}/login`,
        usuario).pipe(tap(
            (res: JwtResponseI) => {
                if(res){
                    // guardar token
                    this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
                    if(res.dataUser.tipo == 1)
                    {
                        environment.tipoUsuario = 1;
                    } else {
                        environment.tipoUsuario = 0;
                    }
                } 
            }
        ));
    }

    logout(): void {
        this.token = '';
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("EXPIRES_IN");
    }

    private saveToken(token: string, expiresIn: string): void {
        localStorage.setItem("ACCESS_TOKEN", token);
        localStorage.setItem("EXPIRES_IN", expiresIn);
        this.token = token;
    }

    private getToken(): string{
        if(!this.token){
            this.token = <string>localStorage.getItem("ACCESS_TOKEN");
        }

        return this.token;
    }
}