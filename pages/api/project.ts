import { VercelRequest, VercelResponse } from '@vercel/node';

export default (req: VercelRequest, res: VercelResponse) => {
  const auth = req.headers.authorization || '';
  const decodedAuth = Buffer.from(auth.split(' ')[1] || '', 'base64').toString('utf8');

  console.log('Decoded Auth:', decodedAuth);  // This should print "YOUR_USERNAME:YOUR_PASSWORD"

  if (decodedAuth === 'YOUR_USERNAME:YOUR_PASSWORD') {
    res.status(200).send("Authenticated");
  } else {
    res.status(401).send("Authentication failed");
  }
};
