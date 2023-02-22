import { Injectable } from "@angular/core";
import { IBilling } from "../models/billing.model";

@Injectable({
  providedIn: "root",
})
export class BillingService {
  constructor() {
    this.getBillings();
  }

  createBillings(data: IBilling) {
    // this.billings.push(data);
  }

  getBillings() {
    // this.billings = this.db.list("billings");
    // return this.billings;
  }

  getBillingById(key: string) {
    // this.billing = this.db.object("products/" + key);
    // return this.billing;
  }

  updateBilling(data: IBilling) {
    // this.billings.update(data.$key, data);
  }

  deleteBilling(key: string) {
    // this.billings.remove(key);
  }
}
