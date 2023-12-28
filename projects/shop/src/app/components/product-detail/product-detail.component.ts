import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Product } from 'projects/admin/src/app/models/product.model';
import { HttpService } from 'projects/admin/src/app/services/http.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  public object$: BehaviorSubject<Product | null> =
    new BehaviorSubject<Product | null>(null);
  public REST_API_SERVER = environment.GET_API_SERVER;
  public selectedId: any;

  constructor(
    private http: HttpService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts() {
    this.route.params.subscribe((params) => {
      this.selectedId = params['id'];
    });
    this.http.getProductId(this.selectedId).subscribe(
      (data: Product) => {
        this.object$.next(data);
      },
      (err) => {
        alert('Tìm kiếm thất bại.');
      }
    );
  }

  public addCart(id: any) {
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser !== null) {
      const cart = {
        customer: {
          username: sessionStorage.getItem('currentUser'),
        },
        product: {
          productId: id,
        },
        quantity: 1,
      };
      console.log(cart);
      this.http.create('cart', cart).subscribe(
        (res) => {
          alert('Thêm vào giỏ hàng thành công.');
          // this.router.navigate(['/cart']);
        },
        (err) => {
          alert('Thêm vào giỏ hàng thất bại.');
        }
      );
    }
    this.router.navigate(['/account']);
  }
}
