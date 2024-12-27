import { useState, useTransition, useEffect } from 'react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import { Loader2, CheckCircle, XCircle, Trash2, Settings } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { applyCoupons, getCoupons, getExpiredCoupons, removeExpiredCoupons } from '@/utils/coupons';
import { identifyShop, KnownShops } from '@/utils/shops';

import type { Coupon } from '@/types';

export default function Popup() {
  const [isApplying, startApplying] = useTransition();
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [shop, setShop] = useState<KnownShops | null>(null);
  const [coupons, setCoupons] = useState<Coupon[] | null>(null);
  const expiredCoupons = coupons ? getExpiredCoupons(coupons) : [];

  const handleGetCoupons = () =>
    startApplying(async () => {
      setCoupons(await getCoupons(shop));
    });

  const handleApplyBestCoupon = () =>
    startApplying(async () => {
      if (shop && coupons) setAppliedCoupon(await applyCoupons(coupons, shop));
    });

  const handleRemoveExpired = () =>
    startApplying(async () => {
      await removeExpiredCoupons(expiredCoupons);
      handleGetCoupons();
    });

  const openSettings = () => chrome.runtime.openOptionsPage();

  useEffect(() => {
    identifyShop().then(setShop);
  }, []);

  useEffect(() => {
    if (shop) handleGetCoupons();
  }, [shop]);

  return (
    <Card className="w-80 shadow-lg">
      <CardHeader className="bg-primary text-white">
        <CardTitle className="flex items-center justify-between">
          <h1 className="flex items-center gap-2">
            <span className="text-2xl font-bold">Afffilly</span>
          </h1>
          <Badge variant="secondary" className="bg-white text-primary">
            {coupons?.length ?? 0} coupons found
          </Badge>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white" onClick={openSettings}>
                  <Settings className="h-4 w-4" />
                  <span className="sr-only">Settings</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Open Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        {isApplying ? (
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="mt-2 text-sm text-gray-600">Applying coupons...</p>
          </div>
        ) : appliedCoupon ? (
          <div className="text-center">
            <CheckCircle className="h-8 w-8 text-green-500 mx-auto" />
            <p className="mt-2 text-lg font-semibold">Best coupon applied!</p>
            <p className="text-sm text-gray-600">Code: {appliedCoupon.code}</p>
          </div>
        ) : (
          <div className="text-center">
            <XCircle className="h-8 w-8 text-gray-400 mx-auto" />
            <p className="mt-2 text-sm text-gray-600">No coupons applied yet</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="justify-center">
        <Button
          onClick={handleApplyBestCoupon}
          disabled={isApplying || !shop}
          className="bg-primary hover:text-black"
        >
          {isApplying ? 'Applying...' : 'Apply Coupons'}
        </Button>
      </CardFooter>
      <CardFooter className="justify-center">
        {expiredCoupons.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full mb-4 text-red-600 hover:bg-red-100"
            onClick={handleRemoveExpired}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Remove Expired Coupons
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
