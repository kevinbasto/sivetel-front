import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

interface ValidateSessionResponse {
  valid: boolean;
  requiresRefresh: boolean;
  session?: string;
  refreshToken?: string;
  user?: {
    id: number;
    username: string;
    isAdmin: boolean;
    name: string;
  };
  expiresIn?: string;
}


export interface LoginDto {
  username: string;
  password: string;
}

export interface AuthResponse {
  id: number;
  session: string;
  refreshToken: string;
  isAdmin: boolean;
  name: string;
  expiresIn: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/auth`;
  private tokenKey = 'auth_token';

  // Observable para suscribirse al estado de login
  private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public loggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * Login de usuario
   */
  login(credentials: LoginDto): Promise<AuthResponse> {
    return lastValueFrom(this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials))
      .then(res => {
        const {session, expiresIn, isAdmin, name, refreshToken, id} = res;
        window.localStorage.setItem('auth_token', session);
        window.localStorage.setItem('refresh_token', refreshToken);
        window.localStorage.setItem('expiresIn', expiresIn);
        let date = new Date();
        window.localStorage.setItem('expeditionDate', (date).toUTCString()),
        window.localStorage.setItem('expiration_date', (new Date(date.getTime() + 1 *60 *60 *1_000).toUTCString()));
        window.localStorage.setItem('isAdmin', isAdmin? 'true' : 'false');
        window.localStorage.setItem('name', name);
        window.localStorage.setItem('id', id.toString());
        // this.setToken(res.session);
        this.loggedInSubject.next(true);
        return res;
      });
  }

  /**
   * Logout
   */
  logout() {
    // this.removeToken();

    window.localStorage.removeItem('auth_token');
    window.localStorage.removeItem('expiresIn');
    window.localStorage.removeItem('expeditionDate'),
    window.localStorage.removeItem('expiration_date');
    window.localStorage.removeItem('isAdmin');
    window.localStorage.removeItem('name');
    this.loggedInSubject.next(false);

  }

  /**
   * Verifica si hay token guardado
   */
  isLoggedIn(): boolean {
    return this.hasToken();
  }

  /**
   * Obtiene el token
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Guardar token en localStorage
   */
  private setToken(token: string) {
    console.log(token);
    localStorage.setItem(this.tokenKey, token);
  }

  /**
   * Eliminar token de localStorage
   */
  private removeToken() {
    localStorage.removeItem(this.tokenKey);
  }

  /**
   * Comprueba si hay token
   */
  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  validateSession(authToken: string, refreshToken: string): Observable<ValidateSessionResponse> {
    return this.http.post<ValidateSessionResponse>(`${this.apiUrl}/validate-session`, {
      accessToken: authToken,
      refreshToken
    });
  }
}
