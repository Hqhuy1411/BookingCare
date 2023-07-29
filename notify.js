/* eslint-disable prettier/prettier */
const request = require('request');

function sendNotification(token, message, title, icon, clickAction) {
  const url = 'https://fcm.googleapis.com/fcm/send';
  const headers = {
    Authorization: 'key=AAAAw8zOWLM:APA91bGrToimkspMeLERgAET0TWdVohrEBovHlxK6TDm9gnHcHJLOZZU0Uh82aRPFFPN4RsUAFsY_QZlM6_XYyHzTS3QorbGWzazLZrYZS6cGq7NImmkfeAEqVhiIJl2ovFgkMMQ19OV',
    'Content-Type': 'application/json',
  };

  const body = {
    to: token,
    notification: {
      body: message,
      title: title,
    //   icon: icon,
    //   click_action: clickAction,
    },
  };

  request.post(
    url,
    {
      headers: headers,
      body: JSON.stringify(body),
    },
    (err, res, body) => {
      if (err) {
        console.log(err);
      } else {
        console.log(body);
      }
    },
  );
}

sendNotification(
  'f3SlFm5SU19zivOS9KlmNZ:APA91bGSH4-HFAuv0i848gxJFtrPS2dYqgsDeRc8BOTFdZy-aEv1BxK5g_PsgC66yBB9kxYDhtOvN_P4_obX6T11R3eAJOfwQgViKG80v0BFGtDgoH7v_2W8vLQLMjvvjwmJ7nvI30Zk',
  'This is a notification',
  'Notification Title',
  'icon.png',
  'https://google.com',
);
