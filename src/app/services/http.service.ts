import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as jwt_decode from 'jwt-decode';

@Injectable()

export class HttpService {
    private token: string = null;
    private PersonalImage: string = null;
    // private decoded_token: {} = {};

    constructor(private http: Http
    ) {
        this.token = localStorage.getItem('token');
        this.PersonalImage = localStorage.getItem('img');
        // this.set_decoded_token();
    }

    sendData(body, URL, extenstion = "") {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(URL + extenstion, body, options);
    }

    setToken(token) {
        localStorage.setItem('token', token);
        this.token = token;
        // this.set_decoded_token();
    }

    getToken() {
        return this.token;
    }

    setImage(image: string) {
        this.PersonalImage = image;
        localStorage.setItem('img', image);

    }

    getImage() {
        return this.PersonalImage;
    }

    // set_decoded_token() {
    //     try {
    //         this.decoded_token = jwt_decode(this.token);
    //     } catch (e) {
    //         this.decoded_token = {}
    //     }
    // }

    is_Authinicated() { //checking the token is valid by expiration date of the token
        if (this.get_left_time_for_shift_in_milliseconds() <= 0)
            return false;
        return true;
    }

    get_left_time_for_shift_in_milliseconds() { // return the time In Milliseconds
        const date = this.get_token_Expiration_Date();
        const now = new Date();
        let shift = date.valueOf() - now.valueOf();
        return shift;
    }

    get_token_Expiration_Date() { // return the expiration date, which exist in the token. if the token is invalid(or not exist) then returns the current date(so when test the expiration it will give its expired)
        let decoded;
        try {
            decoded = jwt_decode(this.token);
        } catch (e) {
            return new Date();
        }
        const date = new Date(0);
        date.setUTCSeconds(decoded['exp']);
        return date;
    }

    clearStorage() {
        localStorage.clear();
        this.token = null;
        this.PersonalImage = null;
    }

}