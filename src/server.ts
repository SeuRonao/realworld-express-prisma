import app from "./app";

const hostname = process.env.HOSTNAME || "localhost";
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.listen(port, hostname, function () {
  console.log(
    `Express Server initiated on http://${hostname}:${port} with NODE_ENV=${process.env.NODE_ENV} and database=${process.env.DATABASE_URL}`
  );
});

process.on("SIGTERM", function () {
  console.log(`SIGTERM signal received: closing HTTP server.`);
  process.exit();
});

process.on("SIGINT", function () {
  console.log(`SIGINT signal received: closing HTTP server.`);
  process.exit();
});
