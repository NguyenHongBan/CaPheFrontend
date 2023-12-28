import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'projects/admin/src/app/services/http.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {
  public reacForm!: FormGroup;
  public reacForm2!: FormGroup;

  constructor(
    private http: HttpService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.initForm2();
  }

  private initForm() {
    this.reacForm = this.fb.group({
      username: [],
      password: [],
    });
  }

  private initForm2() {
    this.reacForm2 = this.fb.group({
      username: [],
      password: [],
    });
  }

  public login(event: any) {
    const newObj = {
      username: this.reacForm.get('username')?.value,
      password: this.reacForm.get('password')?.value,
    };
    this.http.auth('login', newObj).subscribe(
      (res) => {
        alert('Đăng nhập thành công.');
        sessionStorage.setItem('currentUser', newObj.username);
        this.router.navigate(['/home']);
      },
      (err) => {
        alert(err);
      }
    );
  }

  public register(event: any) {
    const newObj = {
      username: this.reacForm2.get('username')?.value,
      password: this.reacForm2.get('password')?.value,
    };
    this.http.auth('register', newObj).subscribe(
      (res) => {
        alert('Đăng ký thành công.');
        this.router.navigate(['/category-root']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }
}
