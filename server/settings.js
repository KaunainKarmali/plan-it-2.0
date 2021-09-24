import dotenv from "dotenv";
dotenv.config();

const production = false;

// connect to mongo
const mongoLocalUrl = "mongodb://localhost:27017/userDB";
const mongoRemoteUrl = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster1.xkb3y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
export const mongoUrl = production ? mongoRemoteUrl : mongoLocalUrl;

// connect to graphiql
export const graphiql = production ? false : true;
