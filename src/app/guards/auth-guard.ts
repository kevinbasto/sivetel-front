import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const authToken = authService.getToken();
  if(authToken){
    return true;
  }else{
    router.navigate(['/login']);
    return true;
  }
};
