// --- INFO -------
// Eenmaal ingelogd is dit de index pagina die u doorverwijst naar een andere pagina.


// --- IMPORTS ----
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PATH_AFTER_LOGIN } from '../../config-global';
import { PATH_DASHBOARD } from '../../routes/paths';


// --- EXPORTS ----
export default function Index() {

  // --- VARIABLES ---
  const { pathname, replace, prefetch } = useRouter();

  // --- EFFECTS -----
  useEffect(() => {

    if (pathname === PATH_DASHBOARD.root) {
      replace(PATH_AFTER_LOGIN);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  useEffect(() => {
    prefetch(PATH_AFTER_LOGIN);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- STRUCTURES --
  return null;
  
}
