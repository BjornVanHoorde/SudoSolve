import { useState } from "react";
import * as Yup from "yup";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { Stack, IconButton, InputAdornment, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// auth
import { useAuthContext } from "../../auth/useAuthContext";
// components
import Iconify from "../../components/iconify";
import FormProvider, { RHFTextField } from "../../components/hook-form";
import { useLocales } from "src/locales";

// ----------------------------------------------------------------------

export default function AuthRegisterForm() {
  const { register } = useAuthContext();
  const { translate } = useLocales();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    username: Yup.string().required(translate("usernameIsRequired")),
    email: Yup.string()
      .required(translate("emailIsRequired"))
      .email(translate("emailMustBeValid")),
    password: Yup.string().required(translate("passwordIsRequired")),
  });

  const defaultValues = {
    username: "",
    email: "",
    password: "",
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data) => {
    try {
      if (register) {
        await register(data.email, data.password, data.username);
      }
    } catch (error) {
      console.error(error);

      reset();

      setError("afterSubmit", {
        ...error,
        message: error.message || error,
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        <RHFTextField name="username" label={translate("username")} />

        <RHFTextField name="email" label={translate("emailAddress")} />

        <RHFTextField
          name="password"
          label={translate("password")}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting || isSubmitSuccessful}
          sx={{
            bgcolor: "text.primary",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
            "&:hover": {
              bgcolor: "text.primary",
              color: (theme) =>
                theme.palette.mode === "light" ? "common.white" : "grey.800",
            },
          }}
        >
          {translate("createAccount")}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
