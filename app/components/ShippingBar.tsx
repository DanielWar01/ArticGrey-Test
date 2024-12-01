import {Money} from '@shopify/hydrogen';
import type {MoneyV2} from '@shopify/hydrogen/storefront-api-types';

export default function ShippingBar({
  price,
}: {
  price: Pick<MoneyV2, 'currencyCode' | 'amount'>;
}) {
  const percent = (parseFloat(price.amount) / 120) * 100;
  return (
    <div className="flex flex-col gap-3">
      <p className="flex gap-1.5">
        You are
        <Money className="font-bold" data={price} />{' '}
        <span className="font-bold">away</span>
        from elegible for free shipping
      </p>
      <div className="flex gap-5 items-center">
        <p>$0</p>
        <div className="w-full bg-gray-300 h-1">
          <div
            className={`bg-[#1b1f23] h-1 duration-300 ease-in`}
            style={{width: `${percent > 100 ? 100 : percent}%`}}
          ></div>
        </div>
        <p>$120</p>
      </div>
    </div>
  );
}
