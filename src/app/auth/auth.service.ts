import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { User } from './user.model';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private URL: string = 'https://identitytoolkit.googleapis.com/v1/accounts:';
    private KEY: string = 'AIzaSyCq-E-e00UtXPFFMsKVnLNxvLDNzEyqSnM';
    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router) { }

    signup(email: string, password: string) {
        return this.http
            .post<AuthResponseData>(this.URL + 'signUp?key=' + this.KEY,
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            .pipe(
                catchError(this.handleError),
                tap(resData => {
                    this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
                }));
    }

    login(email: string, password: string) {
        return this.http
            .post<AuthResponseData>(this.URL + 'signInWithPassword?key=' + this.KEY,
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            .pipe(
                catchError(this.handleError),
                tap(resData => {
                    this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
                }));
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        
        if (!userData) {
            return;
        }
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An error occured';
        if (!errorRes.error || !errorRes.error.error) {
            errorMessage = 'An unknown error occured';
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'A user with this email already exists.';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'A user with this email cannot be found.';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'Incorrect password.';
                break;
            case 'USER_DISABLED':
                errorMessage = 'A user has been disabled.';
                break;
            default:
                errorMessage = 'An error occured';
                break;
        }
        return throwError(errorMessage);
    }
}