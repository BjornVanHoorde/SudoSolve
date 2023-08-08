// next
import NextLink from "next/link";
// @mui
import { Alert, Tooltip, Stack, Typography, Link, Box } from "@mui/material";
// auth
import { useAuthContext } from "../../auth/useAuthContext";
// layouts
import LoginLayout from "../../layouts/login";
// routes
import { PATH_AUTH } from "../../routes/paths";
//
import AuthLoginForm from "./AuthLoginForm";
import AuthWithSocial from "./AuthWithSocial";
import { useLocales } from "src/locales";

// ----------------------------------------------------------------------

export default function Login() {
  const { method } = useAuthContext();
  const { translate } = useLocales();

  return (
    <LoginLayout title=" " illustration="/assets/illustrations/loginImage.png">
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">{translate("signInToSudoSolve")}</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">{translate("newUser")}</Typography>

          <Link
            component={NextLink}
            href={PATH_AUTH.register}
            variant="subtitle2"
          >
            {translate("createAnAccount")}
          </Link>
        </Stack>
      </Stack>

      <AuthLoginForm />

      {/* <AuthWithSocial /> */}
    </LoginLayout>
  );
}
