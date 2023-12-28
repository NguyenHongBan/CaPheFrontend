import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Category } from 'projects/admin/src/app/models/category.model';
import { Product } from 'projects/admin/src/app/models/product.model';
import { HttpService } from 'projects/admin/src/app/services/http.service';

@Component({
  selector: 'app-category-root',
  templateUrl: './category-root.component.html',
})
export class CategoryRootComponent implements OnInit {
  public object$!: Category[];
  public object2$!: Product[];
  public REST_API_SERVER = environment.GET_API_SERVER;
  public selectedId: any;

  constructor(
    private http: HttpService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

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
    this.route.params.subscribe((params) => {
      this.selectedId = params['id'];
    });
    this.http.getProductsCategory(this.selectedId).subscribe(
      (data: Product[] | any) => {
        if (Array.isArray(data)) {
          console.log('Data is an array:', data);
          this.object2$ = data;
        } else if (
          typeof data === 'object' &&
          data !== null &&
          Array.isArray(data.data)
        ) {
          console.log('Data is an object with array property:', data);
          this.object2$ = data.data;
        } else {
          console.log('Data is not an array:', data);
          this.object2$ = [];
        }
      },
      (err) => {
        console.error('Search error:', err);
        this.object2$ = [];
        alert('Tìm kiếm thất bại.');
      }
    );
  }

  public getCategory(id: any) {
    this.router.navigate(['/category-root', id]);
  }
}
