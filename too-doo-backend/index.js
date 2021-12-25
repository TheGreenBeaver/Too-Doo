const { PORT } = require('./config/settings');
const app = require('./server');

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));