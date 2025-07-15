import fs from 'fs';
import { ServerResponse } from 'http';

export function serveStaticFile(res: ServerResponse, filePath: string, contentType = 'text/html') {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end('Internal Server Error');
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}
