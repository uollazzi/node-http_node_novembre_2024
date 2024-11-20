import { createServer, IncomingMessage, ServerResponse } from "node:http";
import url from "node:url";
import { readFileSync } from "node:fs";
import path from "node:path";

const requestListener = (req: IncomingMessage, res: ServerResponse) => {
    console.log("Richiesta ricevuta:", req.method, req.url, new Date().toLocaleString());

    const u = url.parse(req.url!, true);
    const nome = u.query.nome as string;
    const colore = u.query.colore as string;

    switch (u.pathname) {
        case "/":
            res.writeHead(200, { "Content-Type": "text/html" })
            res.write("<html><head><title>Mio sito</title></head><body><h1>Ciao [[nome]]</h1></body></html>".replace("[[nome]]", nome ?? "a tutti"));
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
            let html = readFileSync(path.join("./templates", "welcome.html"), "utf8");
            res.writeHead(200, { "Content-Type": "text/html" });
            html = html.replace("[[nome]]", nome ?? "a te");
            html = html.replace("[[colore]]", colore ?? "FF0000");
            res.end(html);
            break;
        default:
            res.writeHead(404);
            res.end("Pagina non trovata");
    }

}


const server = createServer(requestListener);
server.listen(3000, "localhost", () => console.log("Server in ascolto su http://localhost:3000\nPremere CTRL+C per uscire."))