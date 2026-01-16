import http from 'http';
import fs from 'fs/promises';

let users = [
    {id: 0, name: "Joe"},
    {id: 1, name: "Jim"}
];

/**
 * 
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res 
 */
function apiHandler(req, res)
{
    let resourcePath = req.url.split('/').slice(2);
    
    if (resourcePath[0] === 'users' && req.method == 'GET')
    {
        res.writeHead(200, {"content-type": "application/json"});
        res.end(JSON.stringify(users));
        return;
    }

    if (resourcePath[0] === 'user' && resourcePath[1].match(/\d+/) && req.method == 'GET')
    {
        if (resourcePath[1] > users.length)
        {
            res.writeHead(404, {"content-type": "text/plain"});
            res.end('User not found');
        }

        res.writeHead(200, {"content-type": "application/json"});
        res.end(JSON.stringify(users[resourcePath[1]]));
        return;
    }

    if (resourcePath[0] === 'users' && req.method == 'POST')
    {
        let body = '';
        req.on('data', (chunk) =>{
            body += chunk.toString();
        });
        req.on('end', () =>{
            let newUser = JSON.parse(body);
            newUser.id = users[users.length - 1].id + 1;
            users.push(newUser);
            res.writeHead(201, {"content-type": "application/json"});
            res.write(JSON.stringify(newUser));
            res.end();
        });
        return;
    }

    res.writeHead(404, {"content-type": "text/plain"});
    res.end('Not found');
}

/**
 * 
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res 
 */
async function routingHandler(req, res)
{
    if (req.url === '/secret')
    {
        res.writeHead(200, {"content-type": "text/html"});
        res.end("<i>found a secret!</i>");
        return;
    }

    if (req.url.match(/\/x[a-z]{5}\d{2}/))
    {
        res.writeHead(200, {"content-type": "text/html"});
        res.end(`${xlogin} is the guy`);

        return;
    }

    if (req.url === '/')
    {
        const file = await fs.readFile('./index.html')
        res.writeHead(200, {"content-type": "text/html"});
        res.end(file);
        return;
    }

    if (req.url.match(/\/api\//))
    {
        apiHandler(req, res);
        return;
    }

    res.writeHead(404, {"content-type": "text/plain"});
    res.end('Not found');
}


const server = http.createServer(async (req, res) => {
    console.log(req.method);
    await routingHandler(req, res);
});

const port = 8080;

server.listen(port, () => {
    console.log(`Server runnin on port ${port}`);
})
