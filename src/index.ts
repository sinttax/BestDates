import app from './app';
import config from './config';

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`App is running port PORT ${PORT}`);
});
