import { openDB, DBSchema, IDBPDatabase } from 'idb';

import type { Coupon } from '@/types';

interface AfffillyDB extends DBSchema {
  coupons: {
    key: string;
    value: Coupon;
    indexes: { shop: string; expires: string };
  };
}

export type DB = IDBPDatabase<AfffillyDB>;
let db: DB | null = null;

export async function getDatabase(): Promise<DB> {
  if (!db) {
    db = await openDB<AfffillyDB>('AfffillyDB', 1, {
      upgrade(db) {
        const store = db.createObjectStore('coupons', { keyPath: 'id' });
        store.createIndex('shop', 'shop');
        store.createIndex('expires', 'expires');
      },
    });
  }

  return db;
}
