import dotenv from "dotenv";
import { app } from "./server";

dotenv.config();

const port = 3000;

const server = app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

const onCloseSignal = () => {
  console.log("sigint received, shutting down");
  process.kill(process.pid);
  server.close(() => {
    console.log("server closed");
    process.exit();
  });
  setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
};

process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);
process.once("SIGUSR2", onCloseSignal);

// http://localhost:3000/v1/api/forms/cLZojxk94ous/filteredResponses?filters=[{%22id%22:%22bE2Bo4cGUv49cjnqZ4UnkW%22,%22condition%22:%22equals%22,%22value%22:%22Johnny%22},{%22id%22:%22dSRAe3hygqVwTpPK69p5td%22,%22condition%22:%22greater_than%22,%22value%22:%222024-01-30%22}]
// http://localhost:3000/v1/api/forms/cLZojxk94ous/filteredResponses?filters=[{%22id%22:%22bE2Bo4cGUv49cjnqZ4UnkW%22,%22condition%22:%22equals%22,%22value%22:%22Johnny%22}]
