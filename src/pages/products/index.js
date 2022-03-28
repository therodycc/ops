import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// routes
import { PATH_PRODUCTS } from '../../routes/paths';

// ----------------------------------------------------------------------

export default function Index() {
  const { pathname, push } = useRouter();

  useEffect(() => {
    if (pathname === PATH_PRODUCTS.root) {
      push(PATH_PRODUCTS.list);
    }
  }, [pathname]);

  return null;
}
