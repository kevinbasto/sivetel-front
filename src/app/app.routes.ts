import { Routes } from '@angular/router';
import { Users } from './pages/users/users';
import { CreateUser } from './pages/create-user/create-user';
import { EditUser } from './pages/edit-user/edit-user';

export const routes: Routes = [
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
];
