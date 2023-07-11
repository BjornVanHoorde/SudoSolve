// --- INFO -------
// compact layout


// --- IMPORTS ----
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { Stack, Container } from '@mui/material';
import useOffSetTop from '../../hooks/useOffSetTop';
import { HEADER } from '../../config-global';
const Header = dynamic(() => import('./Header'), { ssr: false });

// ----------------------------------------------------------------------

CompactLayout.propTypes = {
  children: PropTypes.node,
};

// --- EXPORTS ----
export default function CompactLayout({ children }) {

  // --- VARIABLES ----
  const isOffset = useOffSetTop(HEADER.H_MAIN_DESKTOP);

  // --- STRUCTURES ----
  return (
    <>
      <Header isOffset={isOffset} />

      <Container component="main">
        <Stack
          sx={{
            py: 12,
            m: 'auto',
            maxWidth: 400,
            minHeight: '100vh',
            textAlign: 'center',
            justifyContent: 'center',
          }}
        >
          {children}
        </Stack>
      </Container>
    </>
  );
}
