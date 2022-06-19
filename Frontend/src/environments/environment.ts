// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url_api: 'http://localhost:3000/api',
  socket_url: 'http://localhost:3000',
  imgDefault: 'https://res.cloudinary.com/sennt03/image/upload/v1644190649/qxxzb23ov7corfsptvi5.png',
  events: {
    NEW_MESSAGE: 'new_message',
    NOTIFICATION: 'new_notification',
    READ_MESSAGES: 'read_messages'
  }
};