import { CorsOptions } from "cors";

const whitelist = ["http://localhost:3000"];

const corsConfig: CorsOptions = {
  origin: function (origin, callback) {
    if (
      whitelist.indexOf(origin as string) !== -1 ||
      !whitelist.includes(origin as string)
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsConfig