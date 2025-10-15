import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

export interface LoginDto {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  expiresIn?: number; // opcional
  user?: any; // info del usuario si deseas retornarla
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
        console.log(res);
        this.setToken(res.token);
        this.loggedInSubject.next(true);
        return res;
      });
  }

  /**
   * Logout
   */
  logout() {
    this.removeToken();
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
}
