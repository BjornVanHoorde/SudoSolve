// INFO
// ------------------------------------------------------------------------------------------------

// IMPORTS
// ------------------------------------------------------------------------------------------------
import { PATH_AUTH } from "src/routes/paths";
import { useRouter } from "next/router";
import { useAuthContext } from "src/auth/useAuthContext";
import { useEffect } from "react";
import LoadingScreen from "src/components/loading-screen/LoadingScreen";
import { PATH_AFTER_LOGIN } from "src/config-global";

// GLOBALS
// ------------------------------------------------------------------------------------------------

// EXPORT
// ------------------------------------------------------------------------------------------------
export default function HomePage() {
  // DATA & METHODS
  // ------------------------------------------------------------------------------------------------
  const { push } = useRouter();
  const { user, isAuthenticated, isInitialized } = useAuthContext();

  // STATES
  // ------------------------------------------------------------------------------------------------

  // VARIABLES
  // ------------------------------------------------------------------------------------------------

  // FUNCTIONS
  // ------------------------------------------------------------------------------------------------

  // EFFECTS
  // ------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (isInitialized) {
      if (isAuthenticated) {
        push(PATH_AFTER_LOGIN);
      } else {
        push(PATH_AUTH.login);
      }
    }
  }, [user, isInitialized]);

  // COMPONENT
  // ------------------------------------------------------------------------------------------------
  return <LoadingScreen />;
}
