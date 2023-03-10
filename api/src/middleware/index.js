import { sellers } from "../api/controller";

// Middleware function to handle authentication
export const authenticate = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (authHeader) {
		const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString('ascii');
		const [username, password] = credentials.split(':');

		const user = await sellers.findOne({ seller_id: username, seller_zip_code_prefix: password });
		if (user) {
			// Set the authenticated user on the request object for use in later middleware functions
			req.user = user;
			next();
			return;
		}
	}

	// If the user is not authenticated, return a 401 Unauthorized response
	res.setHeader('WWW-Authenticate', 'Basic realm="Authentication Required"');
	res.sendStatus(401);
};
