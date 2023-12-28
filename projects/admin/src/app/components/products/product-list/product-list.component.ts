import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';
import { HttpService } from '../../../services/http.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-product-list',
  template: `<!-- Trong file category-list.component.html -->
    <div class="col-lg-12 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
          <div class="mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Nhập từ khóa tìm kiếm..."
              [(ngModel)]="searchKeyword"
              (input)="search(searchKeyword)"
            />
          </div>
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Tên sản phẩm</th>
                  <th>Tên danh mục</th>
                  <th>Mô tả</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Ngày</th>
                  <th>Hình ảnh</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  *ngFor="
                    let product of search$
                      | paginate : { itemsPerPage: 10, currentPage: p }
                  "
                >
                  <td>
                    {{
                      product.productName.length > 10
                        ? product.productName.slice(0, 10) + '...'
                        : product.productName
                    }}
                  </td>
                  <td>
                    {{
                      product.category.categoryName.length > 10
                        ? product.category.categoryName.slice(0, 10) + '...'
                        : product.category.categoryName
                    }}
                  </td>
                  <td>
                    {{
                      product.description.length > 10
                        ? product.description.slice(0, 10) + '...'
                        : product.description
                    }}
                  </td>
                  <td>{{ product.price }}</td>
                  <td>{{ product.stockQuantity }}</td>
                  <td>{{ product.date }}</td>
                  <td>
                    <img
                      [src]="REST_API_SERVER + '/' + product.fileName"
                      class="product-img-2"
                      alt="product img"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!-- Shop-Pagination -->
    <div class="pagination-area">
      <div class="pagination-number">
        <pagination-controls (pageChange)="p = $event"></pagination-controls>
      </div>
    </div>
    <!-- Shop-Pagination /- --> `,
})
export class ProductListComponent implements OnInit {
  public object$!: Product[];
  public search$!: Product[];
  public searchKeyword!: string;
  public p: number = 1;
  public REST_API_SERVER = environment.GET_API_SERVER;

  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts() {
    this.http.getProducts().subscribe(
      (data: Product[]) => {
        this.object$ = data;
        this.search$ = this.object$;
      },
      (err) => {
        alert('Lấy danh sách thất bại.');
      }
    );
  }

  public search(query: string) {
    this.http.search('product', query).subscribe(
      (data: Product[] | any) => {
        if (Array.isArray(data)) {
          console.log('Data is an array:', data);
          this.search$ = data;
        } else if (
          typeof data === 'object' &&
          data !== null &&
          Array.isArray(data.data)
        ) {
          console.log('Data is an object with array property:', data);
          this.search$ = data.data;
        } else {
          console.log('Data is not an array:', data);
          this.search$ = [];
        }
      },
      (err) => {
        console.error('Search error:', err);
        this.search$ = [];
        alert('Tìm kiếm thất bại.');
      }
    );
  }
}
