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
import { CreateBranch } from './pages/create-branch/create-branch';
import { EditBranch } from './pages/edit-branch/edit-branch';
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';

export const routes: Routes = [
    {
        path: 'login',
        component: Login
    },
    {
        path: '',
        component: ClientLayout,
        canActivate: [authGuard],
        children: [
            {
                path: "users",
                component: Users,
                canActivate: [adminGuard]
            },
            {
                path: 'home',
                component: Dashboard,
                canActivate: [adminGuard]
            },
            {
                path: 'users/create',
                component: CreateUser,
                canActivate: [adminGuard]
            },
            {
                path: 'users/:id',
                component: EditUser,
                canActivate: [adminGuard]
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
                component: Branches,
                canActivate: [adminGuard]
            },
            {
                path: 'branches/create',
                component: CreateBranch,
                canActivate: [adminGuard]
            },
            {
                path: 'branches/:id',
                component: EditBranch,
                canActivate: [adminGuard]
            }
        ]
    }
];
