import dotenv from "dotenv";
dotenv.config();

// connect to local database
// const mongoUrl = "mongodb://localhost:27017/userDB";

// connect to mongoDB Atlas
const mongoUrl = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster1.xkb3y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
`;

export default mongoUrl;
