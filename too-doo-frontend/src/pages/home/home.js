import React from 'react';
import Button from '@mui/material/Button';
import { LINKS, NEW_ROUTE } from '../../util/constants';
import CenterBox from '../../components/center-box';
import { AddTwoTone, ArrowBack } from '@mui/icons-material';
import Box from '@mui/material/Box';
import { useHistory, useParams } from 'react-router-dom';
import SingleToDo from './single-to-do';
import AllToDos from './all-to-dos';


function Home() {
  const params = useParams();
  const history = useHistory();

  const state = params?.state;

  return (
    <CenterBox pt={2} pb={4}>
      <Box
        sx={{
          width: { xs: '90vw', md: '70vw' },
          maxWidth: 800,
          minWidth: 450
        }}
      >
        <Box display='flex' alignItems='center' justifyContent='space-between' mb={2}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => history.push(LINKS.home)}
            style={{ visibility: state ? 'visible' : 'hidden' }}
          >
            Back
          </Button>

          <Button
            startIcon={<AddTwoTone />}
            onClick={() => history.push(LINKS.newToDo)}
            disabled={state === NEW_ROUTE}
          >
            New Ticket
          </Button>
        </Box>

        {
          state
            ? <SingleToDo state={state} />
            : <AllToDos />
        }
      </Box>
    </CenterBox>
  );
}

export default Home;