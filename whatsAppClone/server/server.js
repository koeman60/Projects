const io = require("socket.io")(5000, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

io.on("connection", (socket) => {
  console.log("i connected");
  const id = socket.handshake.query.id;
  socket.join(id);

  socket.on("send-message", ({ recepient, text }) => {
    // const recipients = prop.recepient;
    // const text = prop.text;
    // console.log(recepient, text);
    console.log(recepient, text);
    recepient.forEach((recc) => {
      console.log(recc);
      const newRecipient = recepient.filter((rec) => rec !== recc);
      console.log(newRecipient);

      newRecipient.push(id);
      console.log(newRecipient, id, text);

      socket.broadcast.to(recc).emit("receive-message", {
        recipients: newRecipient,
        sender: id,
        text,
      });
    });
  });
});
