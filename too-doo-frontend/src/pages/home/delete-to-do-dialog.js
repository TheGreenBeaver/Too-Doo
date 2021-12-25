import React, { useState } from 'react';
import { bool, number, func } from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import { LINKS } from '../../util/constants';
import { useSnackbar } from 'notistack';
import Alert from '@mui/material/Alert';
import apiService from '../../util/api';


function DeleteToDoDialog({ toDoId, open, onClose, done }) {
  const history = useHistory();
  const [isProcessing, setIsProcessing] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  function conditionalOnClose() {
    if (!isProcessing) {
      onClose();
    }
  }

  function deleteToDo() {
    setIsProcessing(true);
    apiService.deleteToDo(toDoId)
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

        {
          !done &&
          <Alert severity='warning' sx={{ mt: 2 }}>
            Warning: this Ticket is not Done yet!
          </Alert>
        }
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
  onClose: func.isRequired,
  done: bool
};

export default DeleteToDoDialog;