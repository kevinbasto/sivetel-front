export interface Pin {
  id: number;
  name: string;
  code: string;
  description?: string;
  amount?: number;
  createdAt: Date;
  updatedAt: Date;
}
