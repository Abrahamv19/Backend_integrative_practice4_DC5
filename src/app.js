/* -------------IMPORTS-------------*/
import bodyParser from 'body-parser';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import express from 'express';
import 'express-async-errors';
import exphbs from 'express-handlebars';
import session from 'express-session';
import http from 'http';
import morgan from 'morgan';
import passport from 'passport';
import path from 'path';
import { Server as SocketServer } from 'socket.io';
import swaggerUi from 'swagger-ui-express';
import { connectMongo } from './config/configMongoDB.js';
import config from './config/envConfig.js';
import './config/passport.config.js';
import initPassport from './config/passport.config.js';
import websockets from './config/sockets.config.js';
import { __dirname } from './configPath.js';
import indexRoutes from './routes/index.routes.js';
import specs from './swaggerConfig.js';
import { logger } from './utils/logger.js';
import cors from 'cors';
/*-------CONFIG BASICAS Y CONEXION A BD-------*/
const app = express();
const port = config.port;

/*-------CONFIG SWAGGER-------*/
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

/*-------CONFIG CORS-------*/
const corsOptions = {
  origin: 'http://localhost:8080',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

/*-------SETTING MIDDLEWARES-------*/
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*-------SETTING HANDLEBARS-------*/
const hbs = exphbs.create({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
});

app.engine('handlebars', hbs.engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
/*-------SERVIDORES-------*/
const httpServer = http.createServer(app);
const io = new SocketServer(httpServer);
websockets(io);
const server = httpServer.listen(port, () => {
  // Conexión a DB Atlas.
  connectMongo()
    .then(() => {
      logger.info('☁ Connected to MongoDB');
    })
    .catch((error) => {
      logger.error('Error connecting to MongoDB:', error);
      throw 'Cannot connect to the database';
    });
  logger.info(`📢 Server listening on port: ${port}`);
});
server.on('error', (error) => logger.error(error));

/*-------SESSION-------------*/
app.use(cookieParser('mySecret'));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@codercluster.foujega.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 60 * 30,
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
/*-------PASSPORT-------------*/
initPassport();
app.use(passport.initialize());
app.use(passport.session());

/*-------ROUTES-------*/
app.use('/', indexRoutes);

export default app;




