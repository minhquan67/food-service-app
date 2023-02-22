import { Component, OnInit } from "@angular/core";
import { CartService } from "src/app/share/services/cart.service";

declare var $: any;

@Component({
  selector: "app-navbar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"],
})
export class NavbarComponent implements OnInit {
  cartTotal = 0;
  constructor(
    public cartService: CartService,
  ) {
    this.cartService.getTotalCartObservable().subscribe((totalCart: number)=>{
      this.cartTotal = totalCart;
    })
  }

  ngOnInit() { }
}
