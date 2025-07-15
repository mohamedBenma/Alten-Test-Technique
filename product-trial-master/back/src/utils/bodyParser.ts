import { IncomingMessage } from 'http';

export function parseRequestBody<T = any>(req: IncomingMessage): Promise<T> {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        resolve(parsed as T);
      } catch (err) {
        reject(new Error('Invalid JSON'));
      }
    });

    req.on('error', () => {
      reject(new Error('Failed to read body'));
    });
  });
}
