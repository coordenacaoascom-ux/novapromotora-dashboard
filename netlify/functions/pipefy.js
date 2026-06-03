const https = require('https');
exports.handler = async function(event) {
  const headers = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type', 'Content-Type': 'application/json' };
  if (event.httpMethod === 'OPTIONS') { return { statusCode: 200, headers, body: '' }; }
  return new Promise(function(resolve) {
    const body = event.body || '{}';
    const req = https.request({
      hostname: 'api.pipefy.com',
      path: '/graphql',
      method: 'POST',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJQaXBlZnkiLCJpYXQiOjE3ODAzMzU4MTUsImp0aSI6IjAwNjQzN2M4LWYyZTAtNGYwMS05ZmIxLTE0YmVhZDE2ZjY5NiIsInN1YiI6MzA3NDU5MDcxLCJ1c2VyIjp7ImlkIjozMDc0NTkwNzEsImVtYWlsIjoiZ2VzdGFvZGVwcm9jZXNzb3NAbm92YXByb21vdG9yYS5jb20ifSwidXNlcl90eXBlIjoiYXV0aGVudGljYXRlZCJ9.gyDi7LvQ96wEA5ikzBsuwXmfB0cduUYRK-FB3pWg0GT1XNY2XbEdvvrDG9lsRCJ7ic7Hkv1RMUyeyzb0s_ciMg',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    }, function(res) {
      let data = '';
      res.on('data', function(chunk){ data += chunk; });
      res.on('end', function(){ resolve({ statusCode: 200, headers, body: data }); });
    });
    req.on('error', function(e){ resolve({ statusCode: 500, headers, body: JSON.stringify({ error: e.message }) }); });
    req.write(body);
    req.end();
  });
};