import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-category-list',
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
                  <th>Tên danh mục</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  *ngFor="
                    let category of search$
                      | paginate : { itemsPerPage: 10, currentPage: p }
                  "
                >
                  <td>
                    {{ category.categoryName }}
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
export class CategoryListComponent implements OnInit {
  public object$!: Category[];
  public search$!: Category[];
  public searchKeyword!: string;
  public p: number = 1;

  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories() {
    this.http.getCategories().subscribe(
      (data: Category[]) => {
        this.object$ = data;
        this.search$ = this.object$;
      },
      (err) => {
        alert('Lấy danh sách thất bại.');
      }
    );
  }

  public search(query: string) {
    this.http.search('category', query).subscribe(
      (data: Category[] | any) => {
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
