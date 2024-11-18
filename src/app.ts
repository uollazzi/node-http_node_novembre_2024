import { createServer, IncomingMessage, ServerResponse } from "node:http";
import url from "node:url";

const requestListener = (req: IncomingMessage, res: ServerResponse) => {
    console.log("Richiesta ricevuta:", req.method, req.url, new Date().toLocaleString());

    const u = url.parse(req.url!, true);

    switch (u.pathname) {
        case "/":
            res.writeHead(200, { "Content-Type": "text/html" })
            res.write("<html><head><title>Mio sito</title></head><body><h1>Home Page</h1></body></html>");
            res.end();
            break;
        case "/pippo":
            res.writeHead(200, { "Content-Type": "application/json" })
            const pippo = {
                nome: "Pippo",
                anni: 99
            }
            res.end(JSON.stringify(pippo));
            break;
        case "/ciao":
            res.write("Ciao!!!");
            res.end();
            break;
        default:
            res.writeHead(404);
            res.end("Pagina non trovata");
    }

}


const server = createServer(requestListener);
server.listen(3000, "localhost", () => console.log("Server in ascolto su http://localhost:3000\nPremere CTRL+C per uscire."))