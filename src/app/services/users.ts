import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { User, CreateUserDto, UpdateUserDto } from '../interfaces/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  // Crear un nuevo usuario
  createUser(data: CreateUserDto): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}`, data);
  }

  // Obtener todos los usuarios activos
  getUsers(): Promise<User[]> {
    return lastValueFrom(this.http.get<User[]>(`${this.apiUrl}`));
  }

  // Obtener un usuario por ID
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  // Actualizar un usuario
  updateUser(id: number, data: UpdateUserDto): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${id}`, data);
  }

  // Desactivar (soft delete) un usuario
  deactivateUser(id: number): Observable<{ message: string }> {
    return this.http.patch<{ message: string }>(`${this.apiUrl}/${id}`, { inactive: true });
  }
}
