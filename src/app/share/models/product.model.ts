export interface IProduct {
  $id: number;
  productName: string;
  productCategory: ProductCategory;
  productPrice: number;
  priceDiscount: number;
  productDescription: string;
  productQuatity: number;
  cost?: number;
}

export enum ProductCategory {
  MeatPoultry = 'Meat & Poultry',
  FruitVegetables = 'Fruit & Vegetables',
  Drinks = 'Drinks',
  Right = 'RIGHT',
  ConfectionaryDesserts = 'Confectionary & Desserts',
  BakingCookingIngredients = 'Baking/Cooking Ingredients',
  MiscellaneousItems = 'Miscellaneous Items',
}
