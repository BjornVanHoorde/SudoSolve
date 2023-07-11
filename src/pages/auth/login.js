// --- INFO -------
// Login page


// --- IMPORTS ----
import Head from 'next/head';
import GuestGuard from '../../auth/GuestGuard';
import Login from '../../sections/auth/Login';


// --- EXPORTS ----
export default function LoginPage() {
  return (
    <>
      <Head>
        <title> Login </title>
      </Head>

      <GuestGuard>
        <Login />
      </GuestGuard>
    </>
  );
}
