import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'projects/admin/src/app/services/http.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent implements OnInit {
  public reacForm!: FormGroup;

  constructor(
    private http: HttpService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {}

  private initForm() {
    this.reacForm = this.fb.group({
      name: [],
      phone: [],
      address: [],
      note: [],
    });
  }

  public create(event: any) {}
}
