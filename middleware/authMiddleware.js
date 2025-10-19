import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const authMiddleware = (req, res, next) => {
	try {
    if(!req.header('authorization')) {
      return res.status(401).jsonn({ error: { message: 'Unauthorized!' } });
    }
    
		const token = req.header('authorization')?.replace('Bearer ', '');

		if (!token) {
			return res.status(401).jsonn({ error: { message: 'Unauthorized!' } });
		}

    const user = jwt.verify(token, process.env.JWT_SECRET);
    
    if(!user) {
      return res.status(401).jsonn({ error: { message: 'Unauthorized!' } });
    }

    req.user = user;
    next();
	} catch (error) {
		return res.status(401).json({ error: { message: 'Unauthorized!' } });
	}
};
