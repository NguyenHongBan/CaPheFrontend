import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  template: `<!-- partial:partials/_navbar.html -->
    <nav
      class="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex align-items-top flex-row"
    >
      <div
        class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start"
      >
        <div class="me-3">
          <button
            class="navbar-toggler navbar-toggler align-self-center"
            type="button"
            data-bs-toggle="minimize"
          >
            <span class="icon-menu"></span>
          </button>
        </div>
        <div>
          <a class="navbar-brand brand-logo" href="../index.html">
            <img src="../assets/images/logo.svg" alt="logo" />
          </a>
          <a class="navbar-brand brand-logo-mini" href="../index.html">
            <img src="../assets/images/logo-mini.svg" alt="logo" />
          </a>
        </div>
      </div>
      <div class="navbar-menu-wrapper d-flex align-items-top">
        <button
          class="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button"
          data-bs-toggle="offcanvas"
        >
          <span class="mdi mdi-menu"></span>
        </button>
      </div>
    </nav>
    <!-- partial -->
    <div class="container-fluid page-body-wrapper">
      <!-- partial -->
      <!-- partial:partials/_sidebar.html -->
      <nav class="sidebar sidebar-offcanvas" id="sidebar">
        <ul class="nav">
          <li class="nav-item">
            <a class="nav-link" href="../index.html">
              <i class="mdi mdi-grid-large menu-icon"></i>
              <span class="menu-title">Dashboard</span>
            </a>
          </li>
          <li class="nav-item nav-category">Chức năng</li>
          <li class="nav-item">
            <a
              class="nav-link"
              data-bs-toggle="collapse"
              href="#form-elements"
              aria-expanded="false"
              aria-controls="form-elements"
            >
              <i class="menu-icon mdi mdi-card-text-outline"></i>
              <span class="menu-title">Danh mục</span>
              <i class="menu-arrow"></i>
            </a>
            <div class="collapse" id="form-elements">
              <ul class="nav flex-column sub-menu">
                <li class="nav-item">
                  <a class="nav-link" href="category-create">Thêm danh mục</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="category-list"
                    >Danh sách danh mục</a
                  >
                </li>
              </ul>
            </div>

            <a
              class="nav-link"
              data-bs-toggle="collapse"
              href="#form-elements2"
              aria-expanded="false"
              aria-controls="form-elements"
            >
              <i class="menu-icon mdi mdi-card-text-outline"></i>
              <span class="menu-title">Sản phẩm</span>
              <i class="menu-arrow"></i>
            </a>
            <div class="collapse" id="form-elements2">
              <ul class="nav flex-column sub-menu">
                <li class="nav-item">
                  <a class="nav-link" href="product-create">Thêm sản phẩm</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="product-list">Danh sách sản phẩm</a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
      <!-- partial -->
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="row">
            <router-outlet></router-outlet>
          </div>
        </div>
      </div>
    </div> `,
})
export class NavComponent {}
