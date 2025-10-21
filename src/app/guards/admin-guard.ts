import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  let data = eval(window.localStorage.getItem('isAdmin')!);
  if(data) {
    return true;
  }
  else {
    router.navigate(['/recharges'])
    return false;
  }
    
};
