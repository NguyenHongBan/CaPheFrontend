import { Category } from './category.model';

export interface Product {
  productId: string;
  productName: string;
  description: string;
  price: number;
  stockQuantity: number;
  fileName: string;
  date: Date;
  category: Category;
}
