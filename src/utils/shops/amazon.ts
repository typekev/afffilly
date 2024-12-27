import type { Coupon } from '@/types';

export async function applyAmazonCoupons(coupons: Coupon[]): Promise<Coupon | null> {
  if (coupons.length === 0) {
    console.warn('No active coupons to apply.');
    return null;
  }

  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      if (!tabs[0]?.id) {
        reject('No active tab found.');
        return;
      }

      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          func: async (coupons: Coupon[]) => {
            const getGrandTotal = (): number | null => {
              const table = document.querySelector('#subtotals-marketplace-table');
              const totalCell = table?.querySelector('.grand-total-price') as HTMLElement | null;
              if (totalCell) {
                const priceText = totalCell.textContent?.replace(/[^0-9.]/g, '');
                return priceText ? parseFloat(priceText) : null;
              }
              return null;
            };

            const applyCoupon = (couponCode: string): Promise<boolean> => {
              return new Promise(resolve => {
                const couponInputField = document.querySelector(
                  '#spc-gcpromoinput',
                ) as HTMLInputElement;
                const applyButton = document.querySelector('#gcApplyButtonId') as HTMLInputElement;

                if (!couponInputField || !applyButton) {
                  resolve(false);
                  return;
                }

                couponInputField.value = couponCode;
                applyButton.click();

                const observer = new MutationObserver(() => {
                  const successMessage = document.querySelector('#gc-promo-success') as HTMLElement;
                  const errorMessage = document.querySelector('#gc-error') as HTMLElement;

                  if (
                    successMessage &&
                    window.getComputedStyle(successMessage).display === 'block'
                  ) {
                    observer.disconnect();
                    resolve(true);
                  } else if (
                    errorMessage &&
                    window.getComputedStyle(errorMessage).display === 'block'
                  ) {
                    observer.disconnect();
                    resolve(false);
                  }
                });

                observer.observe(document.body, { childList: true, subtree: true });
              });
            };

            let bestCoupon: Coupon | null = null;
            let bestTotal: number | null = null;

            for (const coupon of coupons) {
              if (await applyCoupon(coupon.code)) {
                const total = getGrandTotal();
                if (total !== null && (bestTotal === null || total < bestTotal)) {
                  bestCoupon = coupon;
                  bestTotal = total;
                }
              }
            }

            if (bestCoupon) {
              await applyCoupon(bestCoupon.code);
            }

            return bestCoupon;
          },
          args: [coupons],
        },
        results => {
          if (chrome.runtime.lastError) {
            console.error('Script injection failed:', chrome.runtime.lastError.message);
            resolve(null);
          } else {
            resolve(results?.[0]?.result ?? null);
          }
        },
      );
    });
  });
}
