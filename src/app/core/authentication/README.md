# Authentication

At first, you should modify the token key at `token.service` to another name such as `TOKEN` or `your-app-token`. By default set to `ng-matero-token`.

In addition, replace the APIs at `login.service` with your owns.

- `/auth/login` Login
- `/auth/refresh` Refresh
- `/auth/logout` Logout
- `/me` Get user information
- `/me/menu` Get user menu
