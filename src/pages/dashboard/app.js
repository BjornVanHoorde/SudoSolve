// --- INFO -------
// Een eerste voorbeeld scherm


// --- IMPORTS ----
import Head from 'next/head';
import { Container, Typography } from '@mui/material';
import { useAuthContext } from '../../auth/useAuthContext';
import DashboardLayout from '../../layouts/dashboard';
import { useSettingsContext } from '../../components/settings';
import { useContext } from 'react';
import { dataContext } from 'src/firebase/dataProvider';

// --- EXPORTS ----
GeneralAppPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default function GeneralAppPage() {

  // --- VARIABLES ---
  const { user } = useAuthContext();
  const { themeStretch } = useSettingsContext();
  const { projects } = useContext( dataContext );

  // --- STRUCTURES --
  return (
    <>
      <Head>
        <title>App</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant='h2'>
          App page
        </Typography>
        <Typography>
          {user.firstname ? 'User: ' + user.firstname : 'no name'}
        </Typography>

        { projects.map(  project => {

          return (
            <Typography>
              {project.name}
            </Typography>
          )

        }) }
        
      </Container>
    </>
  );
}
