import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { Router } from '@angular/router';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-product-create',
  template: `<div class="container-fluid">
    <div class="card">
      <div class="card-body">
        <form class="row g-3" [formGroup]="reacForm">
          <div class="col-12">
            <label for="exampleInputUsername1" class="form-label"
              >Tên sản phẩm</label
            >
            <input
              type="text"
              class="form-control"
              formControlName="productName"
            />
          </div>

          <div class="col-12">
            <label for="exampleSelect" class="form-label">Chọn danh mục</label>
            <select class="form-select" formControlName="categoryId">
              <option
                *ngFor="let category of object$"
                [value]="category.categoryId"
              >
                {{ category.categoryName }}
              </option>
            </select>
          </div>

          <div class="col-12">
            <label for="exampleInputUsername1" class="form-label">Mô tả</label>
            <textarea
              style="height: 10vh"
              type="text"
              class="form-control"
              formControlName="description"
            ></textarea>
          </div>

          <div class="col-12">
            <label for="exampleInputUsername1" class="form-label">Giá</label>
            <input type="number" class="form-control" formControlName="price" />
          </div>

          <div class="col-12">
            <label for="exampleInputUsername1" class="form-label"
              >Số lượng</label
            >
            <input
              type="number"
              class="form-control"
              formControlName="stockQuantity"
            />
          </div>

          <div class="col-12">
            <label for="exampleInputUsername1" class="form-label"
              >Hình ảnh</label
            >
            <input
              type="file"
              class="form-control"
              (change)="onFileSelected($event)"
              formControlName="fileName"
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
            <a href="product-list" class="btn btn-light">Hủy</a>
          </div>
        </form>
      </div>
    </div>
  </div> `,
})
export class ProductCreateComponent implements OnInit {
  public reacForm!: FormGroup;
  public object$!: Category[];
  public selectedFile: File | null = null;
  public fileName!: string;

  constructor(
    private http: HttpService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getCategories();
  }

  private initForm() {
    this.reacForm = this.fb.group({
      productName: [],
      description: [],
      price: [],
      stockQuantity: [],
      fileName: [],
      categoryId: [],
    });
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

  public onFileSelected(event: any) {
    const files: FileList = event.target.files;
    this.selectedFile = files.item(0);
  }

  public create(event: any) {
    if (this.selectedFile) {
      this.http.uploadFile(this.selectedFile).subscribe(
        (res) => {
          this.fileName = res.data.fileName;
          const newObj = {
            productName: this.reacForm.get('productName')?.value,
            description: this.reacForm.get('description')?.value,
            price: this.reacForm.get('price')?.value as number,
            stockQuantity: this.reacForm.get('stockQuantity')?.value as number,
            fileName: this.fileName,
            category: {
              categoryId: this.reacForm.get('categoryId')?.value,
            },
          };
          this.http.create('product', newObj).subscribe(
            (res) => {
              alert('Thêm thành công.');
              this.router.navigate(['/product-list']);
            },
            (err) => {
              alert(err.message);
            }
          );
        },
        (err) => {
          alert('Upload image thất bại.');
        }
      );
    } else {
      alert('Lấy image thất bại.');
    }
  }
}
