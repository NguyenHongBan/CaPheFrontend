import { Customer } from './customer.model';
import { Product } from './product.model';

export interface Cart {
  cartId: string;
  customer: Customer;
  product: Product;
  quantity: number;
}
