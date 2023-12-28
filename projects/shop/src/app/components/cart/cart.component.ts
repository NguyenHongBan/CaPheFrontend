import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { Cart } from 'projects/admin/src/app/models/cart.model';
import { HttpService } from 'projects/admin/src/app/services/http.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  public object$!: Cart[];
  public REST_API_SERVER = environment.GET_API_SERVER;

  constructor(private http: HttpService) {}
  ngOnInit(): void {
    this.getCart();
  }

  private getCart() {
    this.http.getCartUser(sessionStorage.getItem('currentUser')).subscribe(
      (data: Cart[] | any) => {
        if (Array.isArray(data)) {
          console.log('Data is an array:', data);
          this.object$ = data;
        } else if (
          typeof data === 'object' &&
          data !== null &&
          Array.isArray(data.data)
        ) {
          console.log('Data is an object with array property:', data);
          this.object$ = data.data;
        } else {
          console.log('Data is not an array:', data);
          this.object$ = [];
        }
      },
      (err) => {
        console.error('Search error:', err);
        this.object$ = [];
        alert('Tìm kiếm thất bại.');
      }
    );
  }
}
