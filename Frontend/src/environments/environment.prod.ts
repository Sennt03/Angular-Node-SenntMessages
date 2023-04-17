export const environment = {
  production: true,
  url_base: '/',
  url_api: '/api',
  socket_url: '/',
  imgDefault: 'https://res.cloudinary.com/sennt03/image/upload/v1644190649/qxxzb23ov7corfsptvi5.png',
  peer: {
    host: '52.207.247.119',
    port: 3004,
    path: '/peerjs/connect'
  },
  events: {
    NEW_MESSAGE: 'new_message',
    NOTIFICATION: 'new_notification',
    READ_MESSAGES: 'read_messages',
    MESSAGE_DELETED: 'message_deleted',
    CHAT_BLOCKED: 'chat_blocked',
    CHAT_UNLOCKED: 'chat_unlocked',
    SCHEDULE_ADDMESSAGE: 'schedule_addmessage',
    SCHEDULE_DELETEMESSAGE: 'schedule_deletemessage',
    CALL_INCOMING: 'call_incoming',
    CALL_ENDED: 'call_ended'
  }
};