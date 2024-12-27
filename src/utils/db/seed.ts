import { getDatabase } from '@/utils/indexedDB';

import type { Coupon } from '@/types';

import { getCoupons } from '../coupons';

const seedCoupons: Omit<Coupon, 'id'>[] = [
  {
    shop: 'Amazon',
    code: 'SAVE10',
    discount: '10%',
    productIDs: ['12345', '67890'],
    productCategories: ['electronics', 'books'],
    successRate: 85,
    expires: '2024-12-31T23:59:59Z',
  },
  {
    shop: 'Amazon',
    code: 'EXPIRED',
    discount: '10%',
    productIDs: null,
    productCategories: null,
    successRate: 85,
    expires: '2024-11-31T23:59:59Z',
  },
];

export async function seedDatabase(): Promise<void> {
  const db = await getDatabase();

  const existingCoupons = await getCoupons(null, db);
  if (existingCoupons.length > 0) {
    console.log('Database already seeded.');
    return;
  }

  await Promise.all(
    seedCoupons.map(coupon => db.add('coupons', { ...coupon, id: crypto.randomUUID() })),
  );
  console.log('Database seeded successfully.');
}
