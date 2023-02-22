import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IOrder, IOrderDetail } from '../models/order.model';
import { IProduct, ProductCategory } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    CONST_CART = 'CARTITEMS';

    private totalCartHandler = new BehaviorSubject<number>(0);
    private totalCartObservable = this.totalCartHandler.asObservable();

    constructor() { }

    public getTotalCartObservable() {
        this.totalCartHandler.next(this.totalQuantity());
        return this.totalCartObservable;
    }

    public addToCart(product: IProduct) {
        let cartItems = this.getCarts();
        const index = cartItems.findIndex(c => c.productDetails.$id === product.$id);
        if (index !== -1) {
            cartItems[index].quantity++;
        } else {
            cartItems.push({
                productDetails: product,
                quantity: 1
            });
        }
        this.setCart(cartItems);
        this.totalCartHandler.next(this.totalQuantity());
    }

    private setCart(cartItems: IOrderDetail[]) {
        localStorage.setItem(this.CONST_CART, JSON.stringify(cartItems));
    }

    public getCarts(): IOrderDetail[] {
        const cartItems = localStorage.getItem(this.CONST_CART);
        return cartItems ? JSON.parse(cartItems) : [];
    }

    public clearAllCart() {
        localStorage.removeItem(this.CONST_CART);
    }

    public updateItemInCart(orderDetail: IOrderDetail) {
        const cartItems = this.getCarts();
        const index = cartItems.findIndex(c => c.productDetails.$id === orderDetail.productDetails.$id);
        if (orderDetail.quantity === 0) {
            cartItems.splice(index, 1);
        } else {
            cartItems[index] = orderDetail;
        }
        this.setCart(cartItems);
        this.totalCartHandler.next(this.totalQuantity());
    }

    public removeItemIncart(orderDetail: IOrderDetail) {
        const cartItems = this.getCarts();
        const index = cartItems.findIndex(c => c.productDetails.$id === orderDetail.productDetails.$id);

        cartItems.splice(index, 1);

        this.setCart(cartItems);
        this.totalCartHandler.next(this.totalQuantity());
    }

    totalQuantity() {
        return this.getCarts().reduce((total, item) => (total + item.quantity), 0);
    }

    calculateSumOfDrinksQuantity(orderDetails: IOrderDetail[], promoCode?: string): IOrder {
        let orderTotal: number = 0;
        let promoDiscount: number = 0;
        let bakeryDiscount: number = 0;
        let drinksDiscount: number = 0;

        orderDetails.forEach((detail, index) => {
            // Calculate the order total
            const cost = detail.productDetails.priceDiscount ? detail.productDetails.priceDiscount * detail.quantity : detail.productDetails.productPrice * detail.quantity;
            orderTotal += cost;

            // Check for product category and apply discounts
            switch (detail.productDetails.productCategory) {
                case ProductCategory.BakingCookingIngredients:
                    bakeryDiscount += cost;
                    detail.productDetails.cost = cost;
                    break;
                case ProductCategory.Drinks:
                    if (detail.quantity >= 10) {
                        const discount = cost * 0.1;
                        drinksDiscount += discount;
                        detail.productDetails.cost = cost - discount;
                    }else {
                        detail.productDetails.cost = cost
                    }
                    break;
                default:
                    detail.productDetails.cost = cost;
            }
            orderDetails[index] = detail;
        })

        // Promotion and Bakery Discount calculation
        if (orderTotal >= 100 && promoCode === '20OFFPROMO') {
            promoDiscount = 20;
        }

        if (bakeryDiscount >= 50) {
            promoDiscount += 5;
        }
        const totalDiscount = promoDiscount + drinksDiscount;
        const orderTotalWithDiscount = orderTotal - totalDiscount;

        return { orderItems: orderDetails, orderTotal, orderTotalWithDiscount, totalDiscount };
    }
}