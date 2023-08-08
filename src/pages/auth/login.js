// --- INFO -------
// Login page

// --- IMPORTS ----
import Head from "next/head";
import GuestGuard from "../../auth/GuestGuard";
import Login from "../../sections/auth/Login";
import { useLocales } from "src/locales";

// --- EXPORTS ----
export default function LoginPage() {
  const { translate } = useLocales();

  return (
    <>
      <Head>
        <title>{translate("login")}</title>
      </Head>

      <GuestGuard>
        <Login />
      </GuestGuard>
    </>
  );
}
