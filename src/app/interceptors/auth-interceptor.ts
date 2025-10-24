import { HttpInterceptorFn } from '@angular/common/http';

export const httpsInterceptor: HttpInterceptorFn = (req, next) => {
  const session = window.localStorage.getItem('auth_token');
  const newReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${session}`
    }
  });
  return next(newReq);
};