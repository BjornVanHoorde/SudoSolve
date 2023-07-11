// --- INFO -------
// reset password page


// --- IMPORTS ----
import Head from 'next/head';
import NextLink from 'next/link';
import { Link, Typography } from '@mui/material';
import { PATH_AUTH } from '../../routes/paths';
import CompactLayout from '../../layouts/compact';
import Iconify from '../../components/iconify';
import AuthResetPasswordForm from '../../sections/auth/AuthResetPasswordForm';
import { PasswordIcon } from '../../assets/icons';


// --- EXPORTS ----
ResetPasswordPage.getLayout = (page) => <CompactLayout>{page}</CompactLayout>;
export default function ResetPasswordPage() {
  return (
    <>
      <Head>
        <title> Reset Password | Minimal UI</title>
      </Head>

      <PasswordIcon sx={{ mb: 5, height: 96 }} />

      <Typography variant="h3" paragraph>
        Forgot your password?
      </Typography>

      <Typography sx={{ color: 'text.secondary', mb: 5 }}>
        Please enter the email address associated with your account and We will email you a link to
        reset your password.
      </Typography>

      <AuthResetPasswordForm />

      <Link
        component={NextLink}
        href={PATH_AUTH.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          mt: 3,
          mx: 'auto',
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="eva:chevron-left-fill" width={16} />
        Return to sign in
      </Link>
    </>
  );
}
