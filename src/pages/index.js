// --- INFO -------
// Dit is de eerste pagina die je ziet als je naar 'localhost:3000' surft.
// 
// Meestal zal deze pagina een doorverwijzing zijn.


// --- IMPORTS ----
import Head from 'next/head';
import { useTheme } from '@mui/material/styles';
import { Box , Button, Typography } from '@mui/material';
import { PATH_AUTH } from 'src/routes/paths';
import NextLink from 'next/link';


// --- GLOBALS ----


// --- EXPORTS ----
export default function HomePage() {

  // --- VARIABLES ---
  const theme = useTheme();

  // --- STATES ------


  // --- FUNCTIONS ---


  // --- EFFECTS -----

  
  // --- STYLES ------
  const styles = {
    
    container: {
      
      backgroundColor: theme.palette.common.white,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      gap: 4
      
    }
    
  }


  // --- STRUCTURES --
  return (
    <>
      <Head>
        <title>Bird larsen template</title>
      </Head>

      <Box sx={ styles.container }>
        <Typography variant='h1'>
          Bird larsen template
        </Typography>
        <Button component={NextLink} href={PATH_AUTH.login} size="large" variant="contained">
          Go to login
        </Button>
      </Box>

    </>
  );
}

