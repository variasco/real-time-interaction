const ws = require("ws");

const wss = new ws.Server(
  {
    port: 5000,
  },
  () => console.log(`Server started at http://localhost:5000`)
);

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    mes = JSON.parse(message);

    switch (mes.event) {
      case "message":
        broadcastMessage(mes);
        break;
      case "connection":
        broadcastMessage(mes);
        break;
    }
  });
});

function broadcastMessage(message) {
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(message));
  });
}
