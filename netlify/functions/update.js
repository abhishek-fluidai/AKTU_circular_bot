exports.handler = async (event) => {
    await sendMessage(message.chat.id, "I got your message!");

    return { statusCode: 200 };
  };