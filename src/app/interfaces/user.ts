export interface User {
  id: number;
  username: string;
  name: string;
  inactive: boolean;
  isAdmin: boolean;
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
  password?: string;
  inactive?: boolean;
  isAdmin?: boolean;
}