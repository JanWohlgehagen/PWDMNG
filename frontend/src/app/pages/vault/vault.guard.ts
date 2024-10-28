import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../Services/user/user.service';

export const vaultGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  var user = userService.getUser();

  if (user.id) {
    return true;
  } else {
    const token = sessionStorage.getItem('access_token');

    if (token) {
      userService.setUser(token);
      user = userService.getUser();
      if (user.id) {
        return true;
      }
      router.navigate(['/login']);
      return false;
    } else {
      router.navigate(['/login']);
      return false;
    }
  }
};
