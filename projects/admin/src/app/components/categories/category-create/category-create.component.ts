import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-create',
  template: `<div class="container-fluid">
    <div class="card">
      <div class="card-body">
        <form class="row g-3" [formGroup]="reacForm">
          <div class="col-12">
            <label for="exampleInputUsername1" class="form-label"
              >Tên danh mục</label
            >
            <input
              type="text"
              class="form-control"
              formControlName="categoryName"
            />
          </div>
          <div class="col-12">
            <button
              type="submit"
              class="btn btn-primary me-2"
              (click)="create($event)"
            >
              Thêm thông tin
            </button>
            <a href="category-list" class="btn btn-light">Hủy</a>
          </div>
        </form>
      </div>
    </div>
  </div> `,
})
export class CategoryCreateComponent implements OnInit {
  public reacForm!: FormGroup;

  constructor(
    private http: HttpService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.reacForm = this.fb.group({
      categoryName: [],
    });
  }

  public create(event: any) {
    const newObj = {
      categoryName: this.reacForm.get('categoryName')?.value,
    };
    this.http.create('category', newObj).subscribe(
      (res) => {
        alert('Thêm thành công.');
        this.router.navigate(['/category-list']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }
}
