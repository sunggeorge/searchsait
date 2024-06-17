import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells the querystring module to parse the query string into an object.
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    if (pathname === '/api/hello' && req.method === 'POST') {
      // Handle POST request to /api/hello
      handlePOSTRequest(req, res);
    } else {
      // Handle any other requests
      handle(req, res, parsedUrl);
    }
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});

async function handlePOSTRequest(req: any, res: any) {
  // Handle POST request to /api/hello
  const body = await new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      resolve(JSON.parse(body));
    });
  });

  // Send response
  res.status(200).json({ message: 'Hello, ' + body.name });
}