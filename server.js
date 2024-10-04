require("dotenv").config();
const { support_server } = require("./support_server");
require("colors");
const PORT = process.env.PORT || 7010;          
    
const LETSGOSERVER = () => {
  try {
    support_server.listen(PORT, () => {
      console.log(
        `Server is running on port ${PORT}`.yellow.bold.underline
      );
    });
  } catch (error) {
    console.log(`error from main server ${error}`);
  }
};
LETSGOSERVER();
