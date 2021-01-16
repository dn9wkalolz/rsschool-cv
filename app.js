const express = require("express");
const app = express();
const server = require('http').createServer(app);
const io = require("socket.io")(server);
io.on('connection', (socket) => {
	console.log('New user connected')

	socket.on('send message', (message) => {
		io.sockets.emit('received message', message)
	})

    socket.on('typing', (data) => {
		console.log(data)
    	io.sockets.emit('typing', data)
    })
})

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.get('/', (req, res) => {
	res.render('index')
})
server.listen("3000", () => console.log("Server is running..."));
