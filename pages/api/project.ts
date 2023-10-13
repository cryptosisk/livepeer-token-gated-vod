import type { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
    const auth = req.headers.authorization || '';
    const [type, encoded] = auth.split(' ');
    let decoded;

    try {
        decoded = Buffer.from(encoded, 'base64').toString('utf8');
    } catch (e) {
        decoded = '';
    }

    const [username, password] = decoded.split(':');

    if (type === 'Basic' && username === 'YOUR_USERNAME' && password === 'YOUR_PASSWORD') {
        // Authorized
        res.status(200).send('Authorized');
    } else {
        // Not Authorized
        res.status(401).setHeader('WWW-Authenticate', 'Basic realm="Restricted"').send('Authentication required');
    }
};
