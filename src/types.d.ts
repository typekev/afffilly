export interface Coupon {
  id: string;
  shop: string;
  code: string;
  discount: string;
  productIDs: [string, ...string[]] | null;
  productCategories: [string, ...string[]] | null;
  successRate: number;
  expires: string | null;
}

export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];
