import * as express from "express";
import * as os from "os";

const app = express();

app.get("/", (request, response) => {
  const fibonacciNumber = fibonacci(getRandomNumber() * 5);
  response.send(
    `Hi! ECS task ${os.hostname()} is reporting back! ${fibonacciNumber}`
  );
});

app.get("/health", (req, res) => {
  res.sendStatus(200);
});
const PORT = 80;
app.listen(PORT, () => console.log(`The app is listening on port ${PORT}.`));
// febbonaci calsulate for n
function fibonacci(n: number): number {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}
// random select 1 to 10
function getRandomNumber(): number {
  return Math.floor(Math.random() * 10);
}
