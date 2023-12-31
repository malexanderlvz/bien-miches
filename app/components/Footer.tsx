import {useMatches, NavLink} from '@remix-run/react';
import type {FooterQuery} from 'storefrontapi.generated';
import MaxWidthWrapper from './MaxWidthWrapper';
import {Instagram} from 'lucide-react';
import {RiTiktokLine} from 'react-icons/ri';
import {useLoadScript} from '@shopify/hydrogen';
import {cn} from '@/lib/utils';

export function Footer({menu}: FooterQuery) {
  return (
    <footer className="footer">
      <MaxWidthWrapper className="flex flex-col justify-between items-start py-9 gap-8">
        <div className="flex flex-col items-center md:flex-row">
          <div className="flex flex-col items-start gap-4">
            <h5 className="text-base">
              From Jalisco Mexico. Made in Santa Cruz, CA 🌴{' '}
            </h5>
            <div className="flex items-start gap-4">
              <a
                href="https://www.instagram.com/bienmiches/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://www.tiktok.com/@bienmiches"
                target="_blank"
                rel="noopener noreferrer"
              >
                <RiTiktokLine className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div className="klaviyo-form-UQZGXM"></div>
          <FooterMenu menu={menu} />
        </div>
        <div className="text-xs text-stone-300 text-center w-full">
          © 2023-2023, BienMiches.com. or its affiliates
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}

function FooterMenu({menu}: Pick<FooterQuery, 'menu'>) {
  const [root] = useMatches();
  const publicStoreDomain = root?.data?.publicStoreDomain;
  return (
    <nav className="footer-menu" role="navigation">
      {(menu || FALLBACK_FOOTER_MENU).items.map((item) => {
        if (!item.url) return null;
        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain)
            ? new URL(item.url).pathname
            : item.url;
        const isExternal = !url.startsWith('/');
        return isExternal ? (
          <a href={url} key={item.id} rel="noopener noreferrer" target="_blank">
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
    color: isPending ? 'grey' : 'white',
  };
}
