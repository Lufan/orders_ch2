import App    from './app';
import orders from './orderProcessingService';

import { json, urlencoded } from 'body-parser';

const app = new App({
  port       : 8080,
  controllers: [orders],
  middlewares: [
    json(),
    urlencoded({extended: true})
  ]
});

app.listen();

