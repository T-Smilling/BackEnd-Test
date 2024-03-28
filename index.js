const express = require('express');
var methodOverride = require('method-override');
const bodyParser = require("body-parser");
const flash = require("express-flash");
var path = require("path");
require("dotenv").config();
const router = require("./routes/client/index.route");
const routerAdmin = require("./routes/admin/index.route");
const database = require("./config/database");
const system = require("./config/system");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const moment = require('moment');
const {Server} =require("socket.io");
const http=require("http");
database.connect();

const app = express();
const port = process.env.PORT

app.set("views", `${__dirname}/views`)
app.set('view engine', 'pug')
//Socket
const server=http.createServer(app);
const io=new Server(server);
global._io=io;

//
app.use(express.static(`${__dirname}/public`));
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
app.use(methodOverride('_method'));
app.use(cookieParser("T~Smilling"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));
app.locals.prefixAdmin = system.prefixAdmin;
app.locals.moment=moment;

router(app);
routerAdmin(app);
app.get("*",(req,res) => {
  res.render("client/pages/errors/404",{
    pageTitle:"404 Not Fount",
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})