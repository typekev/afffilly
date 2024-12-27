import type { Coupon } from '@/types';

export async function applyAmazonCoupons(coupons: Coupon[]): Promise<Coupon | null> {
  if (coupons.length === 0) {
    console.warn('No active coupons to apply.');
    return null;
  }

  const bestCoupon: Coupon | null = coupons[0];
  try {
    const couponInputField = document.querySelector('#spc-gcpromoinput') as HTMLInputElement;
    if (!couponInputField) {
      console.error('Could not find the coupon input field on Amazon.');
      return null;
    }

    couponInputField.value = bestCoupon.code;

    const applyButton = document.querySelector(
      '#spc-gcpromoapply input[type=submit]',
    ) as HTMLInputElement;
    if (!applyButton) {
      console.error('Could not find the Apply button.');
      return null;
    }

    applyButton.click();

    return new Promise(resolve => {
      const observer = new MutationObserver(() => {
        const successMessage = document.querySelector('.a-alert-success');
        const errorMessage = document.querySelector('.a-alert-error');

        if (successMessage) {
          observer.disconnect();
          resolve(bestCoupon);
        } else if (errorMessage) {
          observer.disconnect();
          resolve(null);
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });
    });
  } catch (error) {
    console.error('Error applying coupon:', error);
    return null;
  }
}
