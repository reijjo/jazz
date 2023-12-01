import chalk from "chalk";
import { app } from "./app";
import { config } from "./utils/config";

app.listen(config.PORT, async () => {
  console.log(chalk.cyanBright(`Server running on port ${config.PORT}`));
});
