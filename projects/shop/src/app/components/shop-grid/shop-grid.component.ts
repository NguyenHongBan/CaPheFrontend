import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Category } from 'projects/admin/src/app/models/category.model';
import { Product } from 'projects/admin/src/app/models/product.model';
import { HttpService } from 'projects/admin/src/app/services/http.service';

@Component({
  selector: 'app-shop-grid',
  templateUrl: './shop-grid.component.html',
})
export class ShopGridComponent implements OnInit {
  public object$!: Category[];
  public object2$!: Product[];
  public REST_API_SERVER = environment.GET_API_SERVER;

  constructor(private http: HttpService, private router: Router) {}

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
  }

  private getCategories() {
    this.http.getCategories().subscribe(
      (data: Category[]) => {
        this.object$ = data;
      },
      (err) => {
        alert('Lấy danh sách thất bại.');
      }
    );
  }

  private getProducts() {
    this.http.getProducts().subscribe(
      (data: Product[]) => {
        this.object2$ = data;
      },
      (err) => {
        alert('Lấy danh sách thất bại.');
      }
    );
  }

  public getCategory(id: any) {
    // this.router.navigate(['/category-root', id]);
  }

  public getProduct(id: any) {
      this.router.navigate(['/product-detail', id]);
  }
}
