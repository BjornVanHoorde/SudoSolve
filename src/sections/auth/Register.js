// next
import NextLink from "next/link";
// @mui
import { Stack, Typography, Link } from "@mui/material";
// layouts
import LoginLayout from "../../layouts/login";
// routes
import { PATH_AUTH } from "../../routes/paths";
//
import AuthWithSocial from "./AuthWithSocial";
import AuthRegisterForm from "./AuthRegisterForm";

// ----------------------------------------------------------------------

export default function Register() {
  return (
    <LoginLayout title=" " illustration="/assets/illustrations/loginImage.png">
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">Get started absolutely free.</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2"> Already have an account? </Typography>

          <Link component={NextLink} href={PATH_AUTH.login} variant="subtitle2">
            Sign in
          </Link>
        </Stack>
      </Stack>

      <AuthRegisterForm />

      <AuthWithSocial />
    </LoginLayout>
  );
}
