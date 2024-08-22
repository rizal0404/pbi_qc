const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

// Dummy credentials
const USERNAME = 'user';
const PASSWORD = 'password';

// Set up the session
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 } // 1 minute session duration
}));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Route for the login page
app.get('/', (req, res) => {
  res.render('login');
});

// Route to handle login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === USERNAME && password === PASSWORD) {
    req.session.loggedIn = true;
    res.redirect('/dashboard');
  } else {
    res.render('login', { error: 'Invalid credentials!' });
  }
});

// Route for the dashboard page
app.get('/dashboard', (req, res) => {
  if (req.session.loggedIn) {
    res.render('dashboard');
  } else {
    res.redirect('/');
  }
});

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
