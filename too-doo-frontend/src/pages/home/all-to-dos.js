import React, { useEffect, useState } from 'react';
import { useAxios } from '../../contexts/axios-context';
import { HTTP_ENDPOINTS, LINKS } from '../../util/constants';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import HoverPaper from '../../components/hover-paper';
import { formatTime } from '../../util/misc';


function AllToDos() {
  const [toDos, setToDos] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

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

  if (isFetching) {
    return <Typography>Heating up...</Typography>;
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
    <Link
      key={toDo.id}
      to={`${LINKS.home}/${toDo.id}`}
      style={{ textDecoration: 'none' }}
    >
      <HoverPaper
        sx={{
          p: [2, 1],
          mb: 2
        }}
      >
        <Typography sx={{ mb: 1 }} variant='h4'>
          {toDo.title}
        </Typography>

        <Typography color='textSecondary' >
          Created: {formatTime(toDo.createdAt)}
        </Typography>
        {
          toDo.createdAt !== toDo.updatedAt &&
          <Typography color='textSecondary'>
            Edited: {formatTime(toDo.updatedAt)}
          </Typography>
        }
      </HoverPaper>
    </Link>
  );
}

export default AllToDos;