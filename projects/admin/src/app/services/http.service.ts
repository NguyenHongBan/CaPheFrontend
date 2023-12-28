import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';
import { Cart } from '../models/cart.model';
import { Customer } from '../models/customer.model';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private REST_API_SERVER = environment.REST_API_SERVER;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  private handleError(error: any) {
    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status},
       Message: ${error.error.message}`;
    }
    return throwError(errorMessage);
  }

  // Auth
  public auth(param: any, body: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/api/customer/${param}`;
    return this.http
      .post<any>(url, body, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Customer
  public getCustomers(): Observable<Customer[]> {
    const url = `${this.REST_API_SERVER}/api/customer`;
    return this.http
      .get<Customer[]>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Category
  public getCategories(): Observable<Category[]> {
    const url = `${this.REST_API_SERVER}/api/category`;
    return this.http
      .get<Category[]>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Product
  public getProducts(): Observable<Product[]> {
    const url = `${this.REST_API_SERVER}/api/product`;
    return this.http
      .get<Product[]>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getProductId(id: any): Observable<Product> {
    const url = `${this.REST_API_SERVER}/api/product/${id}`;
    return this.http
      .get<Product>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getProductsCategory(id: any): Observable<Product[]> {
    const url = `${this.REST_API_SERVER}/api/product/category/${id}`;
    return this.http
      .get<Product[]>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getProductMinMax(): Observable<Product[]> {
    const url = `${this.REST_API_SERVER}/api/product/min`;
    return this.http
      .get<Product[]>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getProductMaxMin(): Observable<Product[]> {
    const url = `${this.REST_API_SERVER}/api/product/max`;
    return this.http
      .get<Product[]>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public create(param: any, body: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/api/${param}`;
    return this.http
      .post<any>(url, body, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public update(param: any, id: any, body: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/api/${param}/${id}`;
    return this.http
      .put<any>(url, body, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public delete(param: any, id: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/api/${param}/${id}`;
    return this.http
      .delete<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public search(param: any, query: string): Observable<Category[]> {
    const url = `${this.REST_API_SERVER}/api/${param}/search?s=${query}`;
    return this.http
      .get<Category[]>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getCartUser(query: any): Observable<Cart[]> {
    const url = `${this.REST_API_SERVER}/api/cart?username=${query}`;
    return this.http
      .get<Cart[]>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getOrders(): Observable<Order[]> {
    const url = `${this.REST_API_SERVER}/api/order`;
    return this.http
      .get<Order[]>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Image
  public uploadFile(file: File): Observable<any> {
    const url = `${this.REST_API_SERVER}/api/image`;
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const httpOptions = {
      headers: new HttpHeaders({
        enctype: 'multipart/form-data',
      }),
    };

    return this.http
      .post<any>(url, formData, httpOptions)
      .pipe(catchError(this.handleError));
  }
}
