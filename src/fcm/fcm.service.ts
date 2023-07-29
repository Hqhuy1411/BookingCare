/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { MessagingPayload, MulticastMessage } from 'firebase-admin/lib/messaging/messaging-api';
import * as fs from 'fs';
import path from 'path'

@Injectable()
export default class FcmService {
  constructor() {
    this.init();
  }

  async init() {
    // eslint-disable-next-line no-await-in-loop
    // const pathToJson = path.join(__dirname, './fcm.json')
    // if(pathToJson){
    //   const jsonString = fs.readFileSync(pathToJson).toString();
    //   const serviceAccountObj = JSON.parse(jsonString)

    //   try {
    //     admin.initializeApp({
    //       credential: admin.credential.cert(serviceAccountObj),
    //     });
    //     console.log('Scc');
    //   } catch (error) {
    //     console.log('Err');
    //   }
    // }else {
    //   console.warn(`fcmJSONServer was not found, FcmService was not init`)
    // }
  }

  public async sendMulticast(multicastMessage: MulticastMessage) {
    try {
      return await admin.messaging().sendMulticast(multicastMessage)
    } catch (e) {
      console.error(e)
    }
  }

    public async sendToDevice(
    registrationTokenOrTokens: string | string[],
    payload: MessagingPayload,
  ) {
    try {
      return await admin.messaging().sendToDevice(registrationTokenOrTokens, payload)
    } catch (e) {
      console.error(e)
    }
  }

}
