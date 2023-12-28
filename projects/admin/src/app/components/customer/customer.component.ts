import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer',
  template: `<!-- Trong file category-list.component.html -->
    <div class="col-lg-12 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
          <div class="mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Nhập từ khóa tìm kiếm..."
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
                    let customer of object$
                      | paginate : { itemsPerPage: 10, currentPage: p }
                  "
                >
                  <td>
                    {{ customer.username }}
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
export class CustomerComponent implements OnInit {
  public object$!: Customer[];
  public p: number = 1;

  constructor(private http: HttpService) {}
  ngOnInit(): void {
    this.getCustomers();
  }

  public getCustomers() {
    this.http.getCustomers().subscribe((data: Customer[]) => {
      this.object$ = data;
    });
  }
}
