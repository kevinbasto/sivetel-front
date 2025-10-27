import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth';

export const httpsInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  
  // Excluir las rutas de autenticación para evitar loops infinitos
  const excludedUrls = ['/auth/login', '/auth/validate-session'];
  const isExcluded = excludedUrls.some(url => req.url.includes(url));
  
  if (isExcluded) {
    return next(req);
  }

  const authToken = window.localStorage.getItem('auth_token');
  const refreshToken = window.localStorage.getItem('refresh_token');

  // Si no hay tokens, continuar sin autorización
  if (!authToken || !refreshToken) {
    return next(req);
  }

  // Validar la sesión antes de cada request
  return authService.validateSession(authToken, refreshToken).pipe(
    switchMap((response) => {
      let tokenToUse = authToken;

      // Si requiere refresh, guardar los nuevos tokens
      if (response.requiresRefresh) {
        window.localStorage.setItem('auth_token', response.session!);
        window.localStorage.setItem('refresh_token', response.refreshToken!);
        tokenToUse = response.session!;
        
        console.log('🔄 Tokens rotados automáticamente');
      }

      // Clonar request con el token (nuevo o existente)
      const newReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${tokenToUse}`
        }
      });

      return next(newReq);
    }),
    catchError((error: HttpErrorResponse) => {
      // Si la validación falla, limpiar tokens y redirigir a login
      if (error.status === 401) {
        window.localStorage.removeItem('auth_token');
        window.localStorage.removeItem('refresh_token');
        
        // Aquí puedes redirigir al login o emitir un evento
        console.error('❌ Sesión expirada, redirigiendo a login...');
        // window.location.href = '/login'; // O usar Router
      }
      
      return throwError(() => error);
    })
  );
};