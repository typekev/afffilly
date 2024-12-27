import type { Coupon } from '@/types';

import { DB, getDatabase } from './indexedDB';
import { KnownShops, Shops } from './shops';

export async function applyCoupons(coupons: Coupon[], shop: KnownShops) {
  return Shops[shop].applyCoupons(coupons);
}

export async function getCoupons(shop?: KnownShops | null, _db?: DB) {
  const db = _db ?? (await getDatabase());

  if (!shop) return await db.getAll('coupons');
  return db.getAllFromIndex('coupons', 'shop', shop);
}

export async function addCoupon(coupon: Coupon) {
  const db = await getDatabase();
  await db.add('coupons', coupon);
}

export async function updateCoupon(coupon: Coupon) {
  const db = await getDatabase();
  await db.put('coupons', coupon);
}

export async function removeCoupon(id: string, _db?: DB) {
  const db = _db ?? (await getDatabase());
  await db.delete('coupons', id);
}

export function getExpiredCoupons(coupons: Coupon[], date = new Date()) {
  return coupons.filter(coupon => isCouponExpired(coupon, date));
}

export async function removeExpiredCoupons(_coupons?: Coupon[] | null) {
  const db = await getDatabase();

  const coupons = _coupons ?? (await getCoupons(null, db));
  if (coupons.length > 0) {
    const now = new Date();
    for (const coupon of coupons) {
      if (isCouponExpired(coupon, now)) removeCoupon(coupon.id, db);
    }
  }
}

function isCouponExpired(coupon: Coupon, date = new Date()) {
  return coupon.expires ? new Date(coupon.expires) < date : false;
}
