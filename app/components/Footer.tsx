import {Suspense} from 'react';
import {Await, NavLink} from '@remix-run/react';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';

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
          <footer className="border-t border-gray-200">
            <div className="page-width py-8 pt-[20px] pb-[20px]">
              {/* Main Footer Content - Two Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Quick Links Column */}
                <div>
                  <h2 className="text-lg mb-4">Quick links</h2>
                  <ul className="space-y-2">
                    <li>
                      <NavLink
                        to="/search"
                        style={activeLinkStyle}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Search
                      </NavLink>
                    </li>
                  </ul>
                </div>

                {/* Company Information Column */}
                <div>
                  <h2 className="text-lg mb-4">Asterism Healthcare</h2>
                  <div className="space-y-2 text-gray-600">
                    <p>
                      <a
                        href="mailto:pabel@asterism-healthcare.com"
                        className="hover:text-gray-900"
                      >
                        pabel@asterism-healthcare.com
                      </a>
                    </p> 
                    <br></br>
                    <p>USA +1 (845) 320-2251</p>
                    <p>Japan +81 (6) 6633-3711</p>
                  </div>
                </div>
              </div>

              {/* Footer Menu - Policies */}
              {footer?.menu && header.shop.primaryDomain?.url && (
                <div className="border-t border-gray-200 pt-8">
                  <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="text-sm text-gray-500">
                      &copy; {new Date().getFullYear()} Asterism Healthcare
                    </div>
                    <nav className="footer-menu flex space-x-6" role="navigation">
                      {(footer.menu || FALLBACK_FOOTER_MENU).items.map((item) => {
                        if (!item.url) return null;
                        const url =
                          item.url.includes('myshopify.com') ||
                          item.url.includes(publicStoreDomain) ||
                          item.url.includes(header.shop.primaryDomain.url)
                            ? new URL(item.url).pathname
                            : item.url;
                        const isExternal = !url.startsWith('/');
                        return isExternal ? (
                          <a
                            href={url}
                            key={item.id}
                            rel="noopener noreferrer"
                            target="_blank"
                            className="text-sm text-gray-500 hover:text-gray-900"
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
                            className="text-sm text-gray-500 hover:text-gray-900"
                          >
                            {item.title}
                          </NavLink>
                        );
                      })}
                    </nav>
                  </div>
                </div>
              )}
            </div>
          </footer>
        )}
      </Await>
    </Suspense>
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
    color: isPending ? 'grey' : 'inherit',
  };
}