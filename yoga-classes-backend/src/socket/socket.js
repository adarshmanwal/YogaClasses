// socket.js
function setUpSocket(io) {
    io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);

        socket.on("disconnect", () => {
            console.log("A user disconnected:", socket.id);
        });

        socket.on("joinShop", (msg) => {
            console.log("Message received:", msg);
            io.emit("message", msg); // Broadcast to all clients
        });

        // Add more socket events here as needed
    });
};

module.exports = setUpSocket;