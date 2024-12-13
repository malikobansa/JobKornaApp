import { Client, Account, Storage, sdk, } from 'react-native-appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6755f48e002e21543eea')
    .setPlatform('com.jobkorna.job');

export const account = new Account(client);
export const storage = new Storage(client);