// INFO
// ------------------------------------------------------------------------------------------------

// IMPORTS
// ------------------------------------------------------------------------------------------------
import Head from "next/head";
import { Container, Tab, Tabs } from "@mui/material";
import DashboardLayout from "src/layouts/dashboard/DashboardLayout";
import { useSettingsContext } from "src/components/settings";
import { useAuthContext } from "src/auth/useAuthContext";
import { useRouter } from "next/router";
import { isMobileContext } from "src/utils/isMobileProvider";
import { useContext, useState } from "react";
import RoleBasedGuard from "src/auth/RoleBasedGuard";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs/CustomBreadcrumbs";
import CreateSudoku from "src/sections/admin/creatSudoku";

// GLOBALS
// ------------------------------------------------------------------------------------------------

// EXPORT
// ------------------------------------------------------------------------------------------------
AdminPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default function AdminPage() {
  // DATA & METHODS
  // ------------------------------------------------------------------------------------------------
  const { user } = useAuthContext();
  const { themeStretch } = useSettingsContext();
  const { push } = useRouter();
  const { isMobile } = useContext(isMobileContext);

  // STATES
  // ------------------------------------------------------------------------------------------------
  const [currentTab, setCurrentTab] = useState(0);

  // VARIABLES
  // ------------------------------------------------------------------------------------------------

  // FUNCTIONS
  // ------------------------------------------------------------------------------------------------
  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  // EFFECTS
  // ------------------------------------------------------------------------------------------------

  // COMPONENT
  // ------------------------------------------------------------------------------------------------
  const TABS = [
    {
      label: "Create",
      component: <CreateSudoku />,
    },
  ];

  return (
    <RoleBasedGuard hasContent roles={["Admin"]}>
      <Head>
        <title>SudoSolve | Admin</title>
      </Head>

      <Container maxWidth={themeStretch ? false : "xl"}>
        <CustomBreadcrumbs heading="Admin" links={[]} />

        <Tabs value={currentTab} onChange={handleChange}>
          {TABS.map((tab, index) => (
            <Tab key={tab.label} label={tab.label} />
          ))}
        </Tabs>

        {TABS[currentTab].component}
      </Container>
    </RoleBasedGuard>
  );
}
