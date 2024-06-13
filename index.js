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
    // maxAge: 1000 * 60 * 60 * 24, // Кука живе 24 години
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

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/', router);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
