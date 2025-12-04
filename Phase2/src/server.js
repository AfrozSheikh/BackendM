import { config } from "./config/env.js";
import { app } from "./app.js";

app.listen(config.port, () => {
  console.log(`🚀 Server running on port ${config.port} in ${config.env} mode`);
});
