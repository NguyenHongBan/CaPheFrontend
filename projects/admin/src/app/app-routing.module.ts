import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryCreateComponent } from './components/categories/category-create/category-create.component';
import { CategoryListComponent } from './components/categories/category-list/category-list.component';
import { ProductCreateComponent } from './components/products/product-create/product-create.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: 'category-create', component: CategoryCreateComponent },
  { path: 'category-list', component: CategoryListComponent },
  { path: 'product-create', component: ProductCreateComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
