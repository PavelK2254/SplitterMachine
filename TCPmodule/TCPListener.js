import net, { Socket } from 'net';
import { parseOrderData } from '../Controller/orderParser'

const port = 1337;
const hostName = '0.0.0.0';
const tcpServer = new net.createServer();


export function initTcpServer() {


    tcpServer.on('connection', (socket) => {
        console.log('A new connection has been established. local address: ' + socket.localAddress);
        socket.write('Echo server\r\n');
        socket.on('error', (err) => {
            console.log('socket error ' + err.stack);
        })
        socket.on('data', (data) => {
            var textChunk = data.toString('utf8');
            console.log(`recieved ${textChunk}`);
            parseOrderData(textChunk).then((result) => {
                console.log(`Returning result: ${JSON.stringify(result)}`);
                socket.write(JSON.stringify(result));
            }).catch((reason) => {
                socket.write(JSON.stringify(reason));
            })
        })

        socket.on('close', (hadError) => {
            console.log('connection closed had error?: ' + hadError);
        })


        socket.on('end', () => {
            console.log('Socket connection ended');

        })

    })

    tcpServer.listen(port, hostName, () => {
        console.log(`Server listening for connection requests on socket port ${port}`, tcpServer.address());
    });
};