import { IProduct } from "./product.model";

export interface IOrder {
    $id?: string;
    orderItems: IOrderDetail[];
    orderTotal: number;
    orderTotalWithDiscount: number;
    totalDiscount: number;
    promoCode?: string;
}

export interface IOrderDetail {
    productDetails: IProduct;
    quantity: number;
}