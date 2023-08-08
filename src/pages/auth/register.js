// --- INFO -------
// register page

// --- IMPORTS ----
import Head from "next/head";
import GuestGuard from "../../auth/GuestGuard";
import Register from "../../sections/auth/Register";
import { useLocales } from "src/locales";

// --- EXPORTS ----
export default function RegisterPage() {
  const { translate } = useLocales();

  return (
    <>
      <Head>
        <title>{translate("register")}</title>
      </Head>

      <GuestGuard>
        <Register />
      </GuestGuard>
    </>
  );
}
