// --- INFO -------
// Een eerste voorbeeld scherm


// --- IMPORTS ----
import Head from 'next/head';
import { Button, Container, TextField, Typography } from '@mui/material';
import { useAuthContext } from '../../../auth/useAuthContext';
import DashboardLayout from '../../../layouts/dashboard';
import { useSettingsContext } from '../../../components/settings';
import { useContext, useEffect , useState } from 'react';
import { dataContext } from 'src/firebase/dataProvider';
import { useRouter } from 'next/router';
import { Stack } from '@mui/system';
import Iconify from 'src/components/iconify';
import { fb_update_project, initialStateProject } from 'src/firebase/apis/projects';


// --- EXPORTS ----
exampleDetail.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default function exampleDetail() {

  // --- VARIABLES ---
  const { themeStretch } = useSettingsContext();
  const { projects } = useContext( dataContext );

  const [ project , setProject ] = useState( initialStateProject );
  const [ projectUnedited , setProjectUnedited ] = useState( initialStateProject );
  const router = useRouter();


  const save = () => {

    fb_update_project( project.id , project );

  }

  useEffect(() => {

    if ( projects.find( p => p.id === router.query.id ) ){
        setProject( projects.find( p => p.id === router.query.id ) );
        setProjectUnedited(projects.find( p => p.id === router.query.id ));
    }

  } , [ projects , router.query ])

  // --- STRUCTURES --
  return (
    <>
      <Head>
        <title>Details</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>

        <Button onClick={() => router.back()}>
            <Iconify icon='eva:arrow-back-fill'/>
            Back
        </Button>
        <Typography sx={{mb: 4}} variant="h3" component="h1">
          { projectUnedited.name }
        </Typography>

        <Typography variant='h5' gutterBottom>
            Edit project
        </Typography>

        <Stack>

            <TextField 
                margin='normal'
                size='small' 
                label='Id' 
                value={ project.id }
                disabled
            />
            <TextField 
                margin='normal'
                size='small' 
                label='Date created' 
                value={ project.dateCreated ? project.dateCreated.toDate() : "" }
                disabled
            />
            <TextField 
                margin='normal'
                size='small' 
                label='Name' 
                value={ project.name }
                onChange={(event) => {
                setProject( {...project , name : event.target.value });
                }}
            />
            <TextField 
                margin='normal'
                size='small' 
                label='Counter' 
                value={ project.count }
                type='number'
                onChange={(event) => {
                setProject( {...project , count : parseInt(event.target.value) });
                }}
            />
            <TextField 
                margin='normal'
                size='small' 
                label='Contact person' 
                value={ project.contact.person }
                onChange={(event) => {
                setProject( {...project , contact : { ...project.contact , person: event.target.value } });
                }}
            />
            <TextField 
                margin='normal'
                size='small' 
                label='Contact email' 
                value={ project.contact.email }
                onChange={(event) => {
                setProject( {...project , contact : { ...project.contact , email: event.target.value } });
                }}
            />

            
            
            
            <Button sx={{width:"fit-content"}} onClick={() => save()}>
                Save changes
            </Button>

        </Stack>


      </Container>
    </>
  );
}
