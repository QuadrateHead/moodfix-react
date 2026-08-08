import { Account, Client, Databases } from "appwrite";

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("6a7454510022bdbbccdf");

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases };
