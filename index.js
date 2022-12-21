const express=require("express");
const app = express();
const requestLogger=require("./utilities/requestLogger");
const userRoute=require("./routes/users");
const session=require("express-session");
var MongoDBStore = require("connect-mongodb-session")(session);
const errorLogger=require("./utilities/errorLogger");
app.use(express.json());
app.use(express.urlencoded({extended:true}));

var store = new MongoDBStore({
    uri:"mongodb://localhost:27017/connect_mongodb_session_test",
    collection:"mySessions",
});
app.use(session({
    secret:"weCareCOOKIE",
    resave:false,
    saveUninitialized:true,
    cookie:{secure:true},
    store:store,
}));
app.use(requestLogger);
app.use("/users",userRoute);
app.use(errorLogger);
app.listen(8000);

app.get("/product")
