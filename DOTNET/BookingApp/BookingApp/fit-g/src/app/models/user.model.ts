import { IonDatetime } from '@ionic/angular';

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface User {
  username: string;
  country: string;
  gender: string;
  token: string;
  lastActive: Date;
}
