// --- INFO -------
// Een eerste voorbeeld scherm


// --- IMPORTS ----
import Head from 'next/head';
import { Button, Container, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useAuthContext } from '../../../auth/useAuthContext';
import DashboardLayout from '../../../layouts/dashboard';
import { useSettingsContext } from '../../../components/settings';
import { useContext } from 'react';
import { dataContext } from 'src/firebase/dataProvider';
import { DataGrid } from '@mui/x-data-grid';
import Link from 'next/link';
import { PATH_DASHBOARD } from 'src/routes/paths';

// --- EXPORTS ----
example.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default function example() {

  // --- VARIABLES ---
  const { user } = useAuthContext();
  const { themeStretch } = useSettingsContext();
  const { projects } = useContext( dataContext );

  // --- STRUCTURES --
  return (
    <>
      <Head>
        <title>Example</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant='h2'>
          Example
        </Typography>

        <Table>
          <TableHead>
            <TableCell>
              Name
            </TableCell>
            <TableCell>
              ...
            </TableCell>
            <TableCell>
              actions
            </TableCell>
          </TableHead>
          <TableBody>

          { projects.map(  project => {

            return (
              <TableRow>
                <TableCell>
                  {project.name}
                </TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <Link href={ PATH_DASHBOARD.general.example.detail( project.id ) }>
                    Open
                  </Link>
                </TableCell>
              </TableRow>
            )

          }) }
            
          </TableBody>
        </Table>


        
      </Container>
    </>
  );
}
