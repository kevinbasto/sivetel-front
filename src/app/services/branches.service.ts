import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { Branch } from "../interfaces/branch";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {
  private apiUrl = `${environment.apiUrl}/branches`;

  constructor(private http: HttpClient) {}

  // Crear un nuevo usuario
  createBranch(data: Branch): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}`, data);
  }

  // Obtener todos los usuarios activos
  getBranches(status: string): Promise<Branch[]> {
    return lastValueFrom(this.http.get<Branch[]>(`${this.apiUrl}`, { params: { status } }));
  }

  // Obtener un usuario por ID
  getBranchById(id: number): Observable<Branch> {
    return this.http.get<Branch>(`${this.apiUrl}/${id}`);
  }

  // Actualizar un usuario
  updateBranch(id: number, data: Branch): Observable<Branch> {
    return this.http.patch<Branch>(`${this.apiUrl}/${id}`, data);
  }

  // Desactivar (soft delete) un usuario
  deactivateBranch(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
