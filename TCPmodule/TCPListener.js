import net, { Socket } from 'net';
import { parseOrderData } from '../Controller/orderParser'

const port = 1337;
const hostName = 'localhost';
const tcpServer = new net.Server();

export function initTcpServer() {
    tcpServer.on('connection', (socket) => {
        console.log('A new connection has been established.');
        socket.write('Echo server\r\n');
        socket.on('error', (err) => {
            console.log('socket error ' + err.stack);
        })
        socket.on('data', (data) => {
            var textChunk = data.toString('utf8');
            console.log(`recieved ${textChunk}`);
            parseOrderData(textChunk).then((result) => {
                console.log(`Returning result: ${result}`);
                socket.write(JSON.stringify(result));
            }).catch((reason) => {
                socket.write(JSON.stringify(reason));
            })
        })

        socket.on('close', (hadError) => {
            console.log('connection closed had error?: ' + hadError);
        })

        socket.on('connect', () => {
            console.log('Socket Connected');
        })

        socket.on('end', () => {
            console.log('Socket connection ended');

        })

    })

    tcpServer.listen(port, (socket) => {
        console.log(`Server listening for connection requests on socket localhost:${port}`);
    });
};