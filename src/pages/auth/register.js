// --- INFO -------
// register page


// --- IMPORTS ----
import Head from 'next/head';
import GuestGuard from '../../auth/GuestGuard';
import Register from '../../sections/auth/Register';


// --- EXPORTS ----
export default function RegisterPage() {
  return (
    <>
      <Head>
        <title> Register </title>
      </Head>

      <GuestGuard>
        <Register />
      </GuestGuard>
    </>
  );
}
