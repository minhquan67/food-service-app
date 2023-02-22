import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IProduct } from "../models/product.model";
import { ToastrService } from "./toastr.service";

@Injectable()
export class ProductService {
  // products: AngularFireList<Product>;
  // product: AngularFireObject<Product>;

  constructor(
    private toastrService: ToastrService,
    private readonly http: HttpClient
  ) { }

  getProducts(): Observable<IProduct[]> {
    let url = 'mock/mock-data/product.json'
    return this.http.get<IProduct[]>(url);
  }

  getProductById(key: string) {
    // this.product = this.db.object("products/" + key);
    // return this.product;
  }

  updateProduct(data: IProduct) {
    // this.products.update(data.$key, data);
  }

  deleteProduct(key: string) {
    // this.products.remove(key);
  }
}
