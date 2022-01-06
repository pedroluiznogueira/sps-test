const jwt = require("jsonwebtoken");
const auth = require("../../config/auth");

const hasToken = (authHeader) => {
    if(!authHeader)
        return res.status(401).send({ error: 'No token provided' });
}

const hasSpace = (parts) => {
    if (!parts.length === 2)
    return res.status(401).send({ error: 'Token error' });
}

const isBearer = (tokenType) => {
    if (!/^Bearer$/i.test(tokenType))
        return res.status(401).send({ error: 'Token malformatted' });
}

const authenticateToken = (token, req, next) => {    
    jwt.verify(token, auth.secret, (err, decoded) => {
        if (err) return res.status(401).send({ error: 'Invalid token' });
        req.userId = decoded.id;

        return next();
    });
}

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const parts = authHeader.split(' ');
    const [ tokenType, token ] = parts;

    hasToken(authHeader);
    
    hasSpace(parts);

    isBearer(tokenType);

    authenticateToken(token, req, next);
}