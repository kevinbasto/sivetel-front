import { Routes } from '@angular/router';
import { Users } from './pages/users/users';
import { CreateUser } from './pages/create-user/create-user';
import { EditUser } from './pages/edit-user/edit-user';
import { Login } from './pages/login/login';
import { ClientLayout } from './layouts/client-layout/client-layout';

export const routes: Routes = [
    {
        path: 'login',
        component: Login
    },
    {
        path: '',
        component: ClientLayout,
        children: [
            {
                path: "users",
                component: Users,
            },
            {
                path: 'users/create',
                component: CreateUser
            },
            {
                path: 'users/:id',
                component: EditUser
            },
        ]
    }
];
