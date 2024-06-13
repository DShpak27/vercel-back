const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const router = express.Router();

router.get('/', (_, res) => {
  res.send('Hello World!');
});

router.get('/set-cookie', (_, res) => {
  res.cookie('testcookie', 'cookie-body', {
    httpOnly: true, // Захищає куку від доступу через JavaScript
    secure: true, // Дозволяє передачу куки лише через HTTPS
    sameSite: 'None', // Дозволяє передачу куки в межсайтовому контексті
  });
  res.send('Cookie set');
});

router.get('/get-cookie', (req, res) => {
  const myCookie = req.cookies.testcookie;
  if (myCookie) {
    res.send(`Cookie value: ${myCookie}`);
  } else {
    res.send('Cookie was not found');
  }
});

app.use(
  cors({ origin: 'https://vercel-front-drab.vercel.app/', credentials: true })
);
app.use(express.json());
app.use(cookieParser());
app.use('/', router);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
