export interface Service {
  id: number;
  name: string;
  code: string;
  description?: string;
  amount?: number;
  createdAt: Date;
  updatedAt: Date;
}
