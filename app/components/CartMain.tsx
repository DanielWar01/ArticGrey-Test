import {useOptimisticCart} from '@shopify/hydrogen';
import {Link} from '@remix-run/react';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
import {CartLineItem} from '~/components/CartLineItem';
import {CartSummary} from './CartSummary';
import ShippingBar from './ShippingBar';
import type {MoneyV2} from '@shopify/hydrogen/storefront-api-types';
import ProductsCartSection from './ProductsCartSection';

export type CartLayout = 'page' | 'aside';

export type CartMainProps = {
  cart: CartApiQueryFragment | null;
  layout: CartLayout;
  recommendedProducts?: any;
};

/**
 * The main cart component that displays the cart items and summary.
 * It is used by both the /cart route and the cart aside dialog.
 */
export function CartMain({
  layout,
  cart: originalCart,
  recommendedProducts,
}: CartMainProps) {
  // The useOptimisticCart hook applies pending actions to the cart
  // so the user immediately sees feedback when they modify the cart.
  const cart = useOptimisticCart(originalCart);

  const linesCount = Boolean(cart?.lines?.nodes?.length || 0);
  const withDiscount =
    cart &&
    Boolean(cart?.discountCodes?.filter((code) => code.applicable)?.length);
  const className = `cart-main ${withDiscount ? 'with-discount' : ''} z-50`;
  const cartHasItems = cart?.totalQuantity! > 0;

  const price = cart?.cost?.subtotalAmount;

  return (
    <div className={className}>
      <ShippingBar price={price as Pick<MoneyV2, 'amount' | 'currencyCode'>} />
      <CartEmpty hidden={linesCount} layout={layout} />
      <div className="cart-details mt-5">
        <div
          aria-labelledby="cart-lines"
          className="cart-lines-div bg-neutral-200 py-3 px-3 rounded-lg max-h-[270px] overflow-y-auto"
        >
          <ul className="flex flex-col gap-4">
            {(cart?.lines?.nodes ?? []).map((line) => (
              <CartLineItem key={line.id} line={line} layout={layout} />
            ))}
          </ul>
        </div>
        <ProductsCartSection products={recommendedProducts} />
        {cartHasItems && <CartSummary cart={cart} layout={layout} />}
      </div>
    </div>
  );
}

function CartEmpty({
  hidden = false,
}: {
  hidden: boolean;
  layout?: CartMainProps['layout'];
}) {
  const {close} = useAside();
  return (
    <div hidden={hidden}>
      <br />
      <p>
        Looks like you haven&rsquo;t added anything yet, let&rsquo;s get you
        started!
      </p>
      <br />
      <Link to="/collections" onClick={close} prefetch="viewport">
        Continue shopping →
      </Link>
    </div>
  );
}
