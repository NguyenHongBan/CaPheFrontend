import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'projects/admin/src/app/models/category.model';
import { HttpService } from 'projects/admin/src/app/services/http.service';

@Component({
  selector: 'app-category',
  template: `<!-- Hero Section Begin -->
    <section class="hero">
      <div class="container">
        <div class="row">
          <div class="col-lg-3">
            <div class="hero__categories">
              <div class="hero__categories__all">
                <i class="fa fa-bars"></i>
                <span>Danh mục</span>
              </div>
              <ul *ngFor="let category of object$">
                <li>
                  <a (click)="getCategory(category.categoryId)">{{
                    category.categoryName
                  }}</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-9">
            <div class="hero__search">
              <div class="hero__search__form">
                <form action="#">
                  <input type="text" placeholder="What do yo u need?" />
                  <button type="submit" class="site-btn">SEARCH</button>
                </form>
              </div>
              <div class="hero__search__phone">
                <div class="hero__search__phone__icon">
                  <i class="fa fa-phone"></i>
                </div>
                <div class="hero__search__phone__text">
                  <h5>+84 396.294.429</h5>
                  <span>Hỗ trợ 24/12 giờ</span>
                </div>
              </div>
            </div>
            <div class="hero__item set-bg" data-setbg="img/hero/banner.jpg">
              <div class="hero__text">
                <span>CAFE NGUYÊN CHẤT</span>
                <p>Có sẵn nhận và giao hàng miễn phí</p>
                <a href="home" class="primary-btn">ĐẾN SHOP CAFE</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Hero Section End --> `,
})
export class CategoryComponent implements OnInit {
  public object$!: Category[];

  constructor(private http: HttpService, private router: Router) {}

  ngOnInit(): void {
    this.getCategories();
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

  public getCategory(id: any) {
    this.router.navigate(['/category-root', id]);
  }
}
