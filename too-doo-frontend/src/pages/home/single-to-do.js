import React, { useEffect, useState } from 'react';
import { string } from 'prop-types';
import { useAxios } from '../../contexts/axios-context';
import { EditableViewWrapper, EditableText } from '../../components/editable-view';
import { HTTP_ENDPOINTS, LINKS, NEW_ROUTE } from '../../util/constants';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { DeleteOutline } from '@mui/icons-material';
import { isEmpty, isEqual } from 'lodash';
import DeleteToDoDialog from './delete-to-do-dialog';
import Box from '@mui/material/Box';
import { formatTime } from '../../util/misc';


const NEW_STATE = {
  title: '',
  description: ''
};

function SingleToDo({ state }) {
  const isNew = state === NEW_ROUTE;
  const [toDo, setToDo] = useState(null);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { api } = useAxios();

  useEffect(() => {
    const fetchToDo = async () => {
      const toDoData = await api(HTTP_ENDPOINTS.getToDo, state).call();
      setToDo(toDoData);
    };

    if (!isNew) {
      fetchToDo();
    }
  }, [state]);

  function onSubmit(values, { setSubmitting, setErrors }) {
    const endpoint = isNew ? HTTP_ENDPOINTS.createToDo : HTTP_ENDPOINTS.updateToDo;
    const toUpdate = { ...values };

    if (!isNew) {
      Object.entries(values).forEach(([key, value]) => {
        if (isEqual(toDo[key], value)) {
          delete toUpdate[key];
        }
      });
    }

    if (isEmpty(toUpdate)) {
      setSubmitting(false);
      return;
    }

    const text = isNew ? 'created' : 'updated';
    const args = isNew ? [toUpdate] : [toDo.id, toUpdate];
    api(endpoint, ...args).call()
      .then(toDoData => {
        enqueueSnackbar(`Ticket successfully ${text}!`, { variant: 'success' });
        if (isNew) {
          history.push(`${LINKS.home}/${toDoData.id}`);
        } else {
          setToDo(toDoData);
        }
      })
      .catch(err => {
        setErrors(err);
        setSubmitting(false);
      });
  }

  if (!isNew && !toDo) {
    return <Typography>Heating up...</Typography>;
  }

  return (
    <>
      <EditableViewWrapper
        initialValues={
          isNew
            ? NEW_STATE
            : { title: toDo.title, description: toDo.description }
        }
        onSubmit={onSubmit}
        isEditingInitially={isNew}
        onCancel={() => {
          if (isNew) {
            history.push(LINKS.home);
          }
        }}
        validationSchema={Yup.object({
          title: Yup.string().required('Title is required').max(32),
          description: Yup.string().required('Description is required').max(500)
        })}
        ExtraActions={
          ({ formik }) => (
            !isNew && <Button
              startIcon={<DeleteOutline />}
              variant='outlined'
              onClick={() => setIsDeleteDialogOpen(true)}
              disabled={formik.isSubmitting}
            >
              Delete
            </Button>
          )
        }
      >
        {
          !isNew &&
          <Box>
            <Typography color='textSecondary'>
              Created: {formatTime(toDo.createdAt)}
            </Typography>
            {
              toDo.createdAt !== toDo.updatedAt &&
              <Typography color='textSecondary'>
                Edited: {formatTime(toDo.updatedAt)}
              </Typography>
            }
            <Box mb={1}/>
          </Box>
        }
        <EditableText
          name='title'
          label='Title'
          fullWidth
          typographyProps={{
            variant: 'h4',
            gutterBottom: true
          }}
        />
        <EditableText
          name='description'
          label='Description'
          multiline
          rows={8}
          fullWidth
          typographyProps={{
            style: {
              whiteSpace: 'normal',
              wordBreak: 'break-all'
            }
          }}
        />
      </EditableViewWrapper>

      <DeleteToDoDialog
        onClose={() => setIsDeleteDialogOpen(false)}
        open={isDeleteDialogOpen}
        toDoId={toDo?.id}
      />
    </>
  );
}

SingleToDo.propTypes = {
  state: string.isRequired
};

export default SingleToDo;