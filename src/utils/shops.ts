import type { Coupon, Entries } from '@/types';

import { applyAmazonCoupons } from './shops/amazon';

export type KnownShops = 'Amazon';

interface ShopHandler {
  applyCoupons: (coupons: Coupon[]) => Promise<Coupon | null>;
}

export const Shops: Record<KnownShops, ShopHandler> = {
  Amazon: {
    applyCoupons: applyAmazonCoupons,
  },
};

export async function identifyShop(): Promise<KnownShops | null> {
  return new Promise(resolve => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      if (tabs[0]?.url) {
        const hostname = new URL(tabs[0].url).hostname;
        const shop = findShopByHostname(hostname);
        resolve(shop);
      } else {
        console.error('No active tab or URL found.');
        resolve(null);
      }
    });
  });
}

type DomainPatterns = Record<KnownShops, RegExp>;

function findShopByHostname(hostname: string): KnownShops | null {
  const domainPatterns: DomainPatterns = {
    Amazon: /^.*\.amazon\.[a-z]+$/,
  };

  for (const [shop, pattern] of Object.entries(domainPatterns) as Entries<DomainPatterns>) {
    if (pattern.test(hostname)) return shop;
  }

  return null;
}
