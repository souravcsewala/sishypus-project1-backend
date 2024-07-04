const express = require("express");
const { DataBaseconnection } = require("./Database/DBconnection");
const errorMiddliware = require("./middileware/errorMiddileware");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const support_server = express();
const cloudinary = require("cloudinary");
var cors = require("cors");
const morgan = require("morgan");
// middileware for json,file,cookies,body parsing
support_server.use(express.json());
support_server.use(cookieParser());
support_server.use(bodyParser.urlencoded({ extended: true }));
support_server.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/", // note: The /tmp/ directory is a special directory on Unix-like operating systems (such as Linux and macOS) that is used to store temporary files. This directory usually already exists and is managed by the operating system. Applications are generally permitted to create temporary files within this directory without needing to create it themselves.
  })
);
// cors policy
const corsOptions = {
  origin: ["http://127.0.0.1:5500"],
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};
support_server.use(cors(corsOptions));

// Morgan for logging
support_server.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :remote-addr"
  )
);

// database connect come on sourav
DataBaseconnection();
// card pdf files upload on cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// routes path home
support_server.get("/", (req, res) => {
  res.send("hii this sisyphus project1 server by sourav,test api ");
});
// other routes
support_server.use("/sisyphus/project1/api", require("./Routes/AuthRoute"));
support_server.use("/sisyphus/project1/api", require("./Routes/MessageRoute"));
support_server.use("/sisyphus/project1/api", require("./Routes/AdminRoute"));
support_server.use("/sisyphus/project1/api", require("./Routes/userinfoRoute"));
support_server.use(
  "/sisyphus/project1/api",
  require("./Routes/instructorRoute")
);

// error middileware
support_server.use(errorMiddliware);
module.exports = { support_server };
