import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable()
export class EmpresaService {
    url: string = 'http://localhost:3000/api/empresa';
    authSubject = new BehaviorSubject(false);

    constructor(private httpClient: HttpClient) { }

    getEmpresas(): Observable<any> {
        return this.httpClient.get(this.url)
    }
}