import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import api from './api';
import config from './config.json';

dotenv.config();
let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
	limit: config.bodyLimit
}));

// api router
app.use('/api', api);

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		success: false,
		payload: null,
		message: `API SAYS: ${error.message} for path: ${req.path}`,
	});
	next();
});

app.use((req, res, next) => {
	res.status(404);
	return res.json({
		success: false,
		payload: null,
		message: `API SAYS: Endpoint not found for path: ${req.path}`,
	});
});

app.server.listen(process.env.PORT || config.port, () => {
	console.log(`Started on port ${app.server.address().port}`);
});

export default app;
