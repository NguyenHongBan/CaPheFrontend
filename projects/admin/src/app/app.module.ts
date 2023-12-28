import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavComponent } from './components/nav/nav.component';
import { CategoryCreateComponent } from './components/categories/category-create/category-create.component';
import { CategoryListComponent } from './components/categories/category-list/category-list.component';
import { ProductCreateComponent } from './components/products/product-create/product-create.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AccountComponent } from './components/account/account.component';
import { CustomerComponent } from './components/customer/customer.component';
import { OrderComponent } from './components/order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    CategoryCreateComponent,
    CategoryListComponent,
    ProductCreateComponent,
    ProductListComponent,
    NotFoundComponent,
    AccountComponent,
    CustomerComponent,
    OrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
