import { Customer } from './customer.model';
import { Product } from './product.model';

export interface Order {
  orderId: string;
  customer: Customer;
  product: Product;
  name: string;
  phone: string;
  address: string;
  date: Date;
  note: string;
  status: string;
}
