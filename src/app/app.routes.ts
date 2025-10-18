import { Routes } from '@angular/router';
import { Users } from './pages/users/users';
import { CreateUser } from './pages/create-user/create-user';
import { EditUser } from './pages/edit-user/edit-user';
import { Login } from './pages/login/login';
import { ClientLayout } from './layouts/client-layout/client-layout';
import { Recharges } from './pages/recharges/recharges';
import { Services } from './pages/services/services';
import { Pins } from './pages/pins/pins';
import { Dashboard } from './pages/dashboard/dashboard';
import { Branches } from './pages/branches/branches';

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
                path: 'home',
                component: Dashboard
            },
            {
                path: 'users/create',
                component: CreateUser
            },
            {
                path: 'users/:id',
                component: EditUser
            },
            {
                path: 'recharges',
                component: Recharges
            },
            {
                path: 'services',
                component: Services
            },
            {
                path: 'pins',
                component: Pins
            },
            {
                path: 'branches',
                component: Branches
            }
        ]
    }
];
