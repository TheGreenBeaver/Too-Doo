import React, { useEffect, useState } from 'react';
import { useAxios } from '../../contexts/axios-context';
import { HTTP_ENDPOINTS, LINKS } from '../../util/constants';
import Typography from '@mui/material/Typography';
import { useHistory } from 'react-router-dom';
import HoverPaper from '../../components/hover-paper';
import { formatTime } from '../../util/misc';
import IconButton from '@mui/material/IconButton';
import { CheckCircle } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import Loading from '../../components/loading';


function AllToDos() {
  const [toDos, setToDos] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isToggling, setIsToggling] = useState(null);
  const history = useHistory();

  const { api } = useAxios();

  useEffect(() => {
    const fetchToDos = async () => {
      setIsFetching(true);
      try {
        const toDosData = await api(HTTP_ENDPOINTS.listToDos).call();
        setToDos(toDosData);
      } finally {
        setIsFetching(false);
      }
    };

    fetchToDos();
  }, []);

  function toggleDone(e, toDo) {
    e.stopPropagation();
    setIsToggling(toDo.id);
    api(HTTP_ENDPOINTS.updateToDo, toDo.id, { done: !toDo.done }).call()
      .then(toDoData => {
        setToDos(curr => curr.map(item => item.id === toDo.id ? toDoData : item));
        setIsToggling(null);
      });
  }

  if (isFetching) {
    return <Loading />;
  }

  if (!toDos.length) {
    return (
      <Typography
        variant='overline'
        align='center'
        sx={{
          color: 'primary.contrastText',
          width: '100%',
          display: 'inline-block',
          fontSize: '1rem'
        }}
      >
        Nothing planned yet!
      </Typography>
    );
  }

  return toDos.map(toDo =>
    <HoverPaper
      key={toDo.id}
      sx={{
        p: [2, 1],
        mb: 2,
        position: 'relative',
        cursor: 'pointer'
      }}
      onClick={() => history.push(`${LINKS.home}/${toDo.id}`)}
    >
      <Typography sx={{ mb: 1, textDecoration: toDo.done ? 'line-through' : 'none' }} variant='h4'>
        {toDo.title}
      </Typography>

      <Tooltip title={`Mark as ${toDo.done ? 'pending' : 'done'}`}>
        <IconButton
          sx={{
            position: 'absolute',
            top: theme => theme.spacing(2),
            right: theme => theme.spacing(1)
          }}
          onClick={e => toggleDone(e, toDo)}
          disabled={isToggling === toDo.id}
        >
          <CheckCircle sx={{ color: toDo.done ? 'success.light' : 'grey.600' }} />
        </IconButton>
      </Tooltip>

      <Typography color='textSecondary'>
        Created: {formatTime(toDo.createdAt)}
      </Typography>
      {
        toDo.createdAt !== toDo.updatedAt &&
        <Typography color='textSecondary'>
          Updated: {formatTime(toDo.updatedAt)}
        </Typography>
      }
    </HoverPaper>
  );
}

export default AllToDos;