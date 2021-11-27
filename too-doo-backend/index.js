const express = require('express');
const { PORT } = require('./config/settings');
const useMiddleware = require('./middleware');
const useRouting = require('./routing');


const app = express();

useMiddleware(app, { prefix: 'app-level.' });

useRouting(app);

useMiddleware(app, { prefix: 'errors.' });

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));