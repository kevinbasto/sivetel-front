import { Branch } from "./branch";

export interface User {
  id: number;
  username: string;
  name: string;
  inactive: boolean;
  isAdmin: boolean;
  branch: Branch;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDto {
  username: string;
  name: string;
  password: string;
  isAdmin?: boolean; // opcional, default false
}

// Para actualizar un usuario
export interface UpdateUserDto {
  name?: string;
  branch?: Branch;
  password?: string;
  inactive?: boolean;
  isAdmin?: boolean;
}