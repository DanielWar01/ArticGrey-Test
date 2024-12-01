import {Suspense} from 'react';
import {Await, NavLink} from '@remix-run/react';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';
import NewsLetterForm from './NewsLetterForm';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

export function Footer({
  footer: footerPromise,
  header,
  publicStoreDomain,
}: FooterProps) {
  return (
    <Suspense>
      <Await resolve={footerPromise}>
        {(footer) => (
          <footer className="footer">
            <section className="flex mx-10 flex-col md:justify-between md:flex-row">
              <NewsLetterForm />
              {footer?.menu && header.shop.primaryDomain?.url && (
                <FooterMenu
                  menu={footer.menu}
                  primaryDomainUrl={header.shop.primaryDomain.url}
                  publicStoreDomain={publicStoreDomain}
                />
              )}
              <div className="footer-menu flex flex-col">
                <h4 className="font-bold text-lg">Support</h4>
                <NavLink end prefetch="intent" to={'/'}>
                  Order Status
                </NavLink>
                <NavLink end prefetch="intent" to={'/'}>
                  Help Center
                </NavLink>
                <NavLink end prefetch="intent" to={'/'}>
                  Contact Us
                </NavLink>
                <NavLink end prefetch="intent" to={'/'}>
                  Returns
                </NavLink>
              </div>
              <div className="footer-menu flex flex-col">
                <h4 className="font-bold text-lg">Important Link</h4>
                <NavLink end prefetch="intent" to={'/'}>
                  Maintenance
                </NavLink>
                <NavLink end prefetch="intent" to={'/'}>
                  Warranty
                </NavLink>
                <NavLink end prefetch="intent" to={'/'}>
                  Canadian Customers
                </NavLink>
                <NavLink end prefetch="intent" to={'/'}>
                  Setup
                </NavLink>
              </div>
              <div className="footer-menu flex flex-col">
                <h4 className="font-bold text-lg">Legal</h4>
                <NavLink end prefetch="intent" to={'/'}>
                  Privacy Legacy
                </NavLink>
                <NavLink end prefetch="intent" to={'/'}>
                  Terms of Service
                </NavLink>
                <NavLink end prefetch="intent" to={'/'}>
                  Affiliate Program
                </NavLink>
                <NavLink end prefetch="intent" to={'/'}>
                  Articles
                </NavLink>
              </div>
              <div className="footer-menu flex flex-col">
                <h4 className="font-bold">Contact Us</h4>
                <p>Let Us Help You</p>
                <p className="font-bold text-2xl">(888) 860-0572</p>
                <p className="font-bold">Connect With Us</p>
                <ul className="flex gap-2">
                  <li>
                    <a
                      href="https://www.instagram.com/arcticgrey/"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <img
                        src="/icons/social-media/Instagram-1.svg"
                        alt="Instagram"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://x.com/elonmusk"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <img
                        src="/icons/social-media/Twitter.svg"
                        alt="X-Twitter"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.facebook.com/ArcticGrey/?locale=es_LA"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <img
                        src="/icons/social-media/Facebook.svg"
                        alt="Facebook"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com/@arcticgrey"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <img
                        src="/icons/social-media/YouTube.svg"
                        alt="YouTube"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </section>
            <div className="w-full flex justify-between px-10 py-2 border-t border-t-neutral-400">
              <p className="font-[500] text-neutral-500">
                © uncmfrt.com. All right reserved.
              </p>
              <p>Made with &hearts; and &#9749; by Artic Grey</p>
            </div>
          </footer>
        )}
      </Await>
    </Suspense>
  );
}

function FooterMenu({
  menu,
  primaryDomainUrl,
  publicStoreDomain,
}: {
  menu: FooterQuery['menu'];
  primaryDomainUrl: FooterProps['header']['shop']['primaryDomain']['url'];
  publicStoreDomain: string;
}) {
  return (
    <nav className="footer-menu flex flex-col" role="navigation">
      <h4 className="font-bold text-lg">About Us</h4>
      {(menu || FALLBACK_FOOTER_MENU).items.map((item) => {
        if (!item.url) return null;
        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        const isExternal = !url.startsWith('/');
        return isExternal ? (
          <a
            href={url}
            key={item.id}
            rel="noopener noreferrer text-[#1b1f23]"
            target="_blank"
          >
            {item.title}
          </a>
        ) : (
          <NavLink
            end
            key={item.id}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : '#1b1f23',
  };
}
