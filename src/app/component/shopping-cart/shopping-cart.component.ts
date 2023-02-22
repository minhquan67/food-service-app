import { Component, OnInit } from '@angular/core';
import { IOrder, IOrderDetail } from 'src/app/share/models/order.model';
import { CartService } from 'src/app/share/services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cartItems: IOrderDetail[] = [];
  order: IOrder | undefined;
  promotionCode = '';

  constructor(public cartService: CartService) { }

  ngOnInit(): void {
    this.changeCartItemsAndOrder();
  }

  onChangeQuantity(orderDetail: IOrderDetail) {
    this.cartService.updateItemInCart(orderDetail);
    this.changeCartItemsAndOrder();
  }

  removeCartItem(orderDetail: IOrderDetail) {
    this.cartService.removeItemIncart(orderDetail);
    this.changeCartItemsAndOrder();
  }

  updatePromotion() {
    this.changeCartItemsAndOrder();
  }

  changeCartItemsAndOrder(){
    this.cartItems = this.cartService.getCarts();
    this.order = this.cartService.calculateSumOfDrinksQuantity(this.cartItems, this.promotionCode);
  }
}
