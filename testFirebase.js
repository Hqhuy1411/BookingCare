/* eslint-disable prettier/prettier */
var admin = require('firebase-admin');

// eslint-disable-next-line @typescript-eslint/no-var-requires
var serviceAccount = require('./keyAccountFirebase.json');

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log('Scc');
} catch (error) {
  console.log('Err');
}
// const data = {
//     message: {
//       tokens: ['f3SlFm5SU19zivOS9KlmNZ:APA91bGSH4-HFAuv0i848gxJFtrPS2dYqgsDeRc8BOTFdZy-aEv1BxK5g_PsgC66yBB9kxYDhtOvN_P4_obX6T11R3eAJOfwQgViKG80v0BFGtDgoH7v_2W8vLQLMjvvjwmJ7nvI30Zk'],
//       notification: {
//         title: "Notification Title",
//         body: "Notification Body ",
//       },
//       data: {
//         Nick: "Mario",
//         Room: "PortugalVSDenmark",
//       },
//     },
//   };


//   admin.messaging().sendMulticast(data.message).then((error, infor) => console.log(error.responses[0].error))



const registrationToken = 'f3SlFm5SU19zivOS9KlmNZ:APA91bGSH4-HFAuv0i848gxJFtrPS2dYqgsDeRc8BOTFdZy-aEv1BxK5g_PsgC66yBB9kxYDhtOvN_P4_obX6T11R3eAJOfwQgViKG80v0BFGtDgoH7v_2W8vLQLMjvvjwmJ7nvI30Zk';

const message = {
  data: {
    score: '850',
    time: '2:45'
  },
  token: registrationToken
};
admin.messaging().send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });

// const messaging = admin.messaging();

// const message = {
//     condition: 'appVersion >= "1.0.0"',
//   to: 'db923uyu2PSkFqPAVcRzzY:APA91bFd8WEgIWysHi_e6NRjgABHeYj815d5BAoyJPecbPgfgVyQ8cPD2787bTO3stCt7YrGYDKeuzLfOW-q8e5QkxuE2OSKX0_Pqkpdomd8393qfrVu5qvjaM6VuuAnpl9kYxS5dwGM',
//   notification: {
//     title: 'New Notification',
//     body: 'This is a new notification from Firebase.'
//   }
// };

// messaging.send(message);
// const message = {
//     data: {
//       score: '850',
//       time: '2:45'
//     },
//     token: registrationToken,
//     android: {
//       notification: {
//         // Add notification details if needed
//       }
//     },
//     apns: {
//       payload: {
//         // Add APNs payload if needed
//       }
//     }
//   };

//   admin.messaging().send(message)
//   .then((response) => {
//     // Response is a message ID string.
//     console.log('Successfully sent message:', response);
//   })
//   .catch((error) => {
//     console.log('Error sending message:', error);
//   });
