import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from '../../core/interfaces/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  endpoint = `users`

  constructor(
    private http: HttpClient
  ) {
    
  }

  getClients() {
    return lastValueFrom(this.http.get<Array<Partial<User>>>(`${environment.apiUrl}/${this.endpoint}`))
  }
}
