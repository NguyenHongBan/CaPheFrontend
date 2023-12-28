import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order.model';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit {
  public object$!: Order[];
  public p: number = 1;

  constructor(private http: HttpService) {}
  ngOnInit(): void {
    this.getOrders();
  }

  private getOrders() {
    this.http.getOrders().subscribe((data: Order[]) => {
      this.object$ = data;
    });
  }
}
