import React, { useState } from 'react';
import { bool, number, func } from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import { useAxios } from '../../contexts/axios-context';
import { HTTP_ENDPOINTS, LINKS } from '../../util/constants';
import { useSnackbar } from 'notistack';


function DeleteToDoDialog({ toDoId, open, onClose }) {
  const history = useHistory();
  const [isProcessing, setIsProcessing] = useState(false);
  const { api } = useAxios();
  const { enqueueSnackbar } = useSnackbar();

  function conditionalOnClose() {
    if (!isProcessing) {
      onClose();
    }
  }

  function deleteToDo() {
    setIsProcessing(true);
    api(HTTP_ENDPOINTS.deleteToDo, toDoId).call()
      .then(() => {
        enqueueSnackbar('Ticket successfully deleted!');
        history.push(LINKS.home);
      })
  }

  return (
    <Dialog
      open={open}
      onClose={conditionalOnClose}
    >
      <DialogContent style={{ minWidth: 450 }}>
        <DialogContentText>
          Are you sure you want to delete this ticket?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={deleteToDo} disabled={isProcessing}>
          Delete
        </Button>
        <Button onClick={onClose} disabled={isProcessing} variant='outlined'>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DeleteToDoDialog.propTypes = {
  toDoId: number,
  open: bool.isRequired,
  onClose: func.isRequired
};

export default DeleteToDoDialog;