import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../share/models/product.model';
import { CartService } from '../../share/services/cart.service';
import { ProductService } from '../../share/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: IProduct[] = [];
  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((items) => this.products = items);
  }

  addToCart(product: IProduct) {
    this.cartService.addToCart(product);
    const index = this.products.findIndex(c => c.$id === product.$id);
    if (index !== -1) {
      this.products[index].productQuatity--;
    }
  }
}
