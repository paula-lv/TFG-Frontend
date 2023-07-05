import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserI } from "../models/user";
import { JwtResponseI } from "../models/jwt-response";
import { tap } from "rxjs/operators";
import { Observable, BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";

@Injectable()
export class ApiService {
    url: string = 'http://localhost:3000/api/empresa';

    constructor(private httpClient: HttpClient, private router: Router) { }

    
}