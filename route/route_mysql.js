var router = require('express').Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
router.use(bodyParser.json())

cons db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'sekolahku'
})
db.connect(()=>{
    console.log('Terhubung ke MySQL!')
});

// route get all data
// GET route to redirect to '/data'
router.get('/data', function (req, res, next) {
    User.findById(req.session.userId)
      .exec(function (error, user) {
        if (error) {
          return next(error);
        } else {
          if (user === null) {
            var err = new Error('Not authorized! Go back!');
            err.status = 400;
            return next(err);
          } else {
            return res.send('<h2>Your name: </h2>' + user.username + '<h2>Your email: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
          }
        }
      });
  });
  
  // GET for logout
  router.get('/logout', function (req, res, next) {
    if (req.session) {
      // delete session object
      req.session.destroy(function (err) {
        if (err) {
          return next(err);
        } else {
          return res.redirect('/');
        }
      });
    }
  });

// insert data to mysql
router.post('/data', function (req, res, next) {
  
    if (req.body.password !== req.body.passwordConf) {
      var err = new Error('Password doesn\'t match!');
      err.status = 400;
      res.send('Password doesn\'t match!');
      return next(err);
    }
  
    if (req.body.email &&
      req.body.username &&
      req.body.password &&
      req.body.passwordConf) {
  
      var userData = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        passwordConf: req.body.passwordConf,
      }
  
      User.create(userData, function (error, user) {
        if (error) {
          return next(error);
        } else {
          req.session.userId = user._id;
          return res.redirect('/users');
        }
      });
  
    } else if (req.body.logemail && req.body.logpassword) {
      User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
        if (error || !user) {
          var err = new Error('Wrong email or password!');
          err.status = 401;
          return next(err);
        } else {
          req.session.userId = user._id;
          return res.redirect('/users');
        }
      });
    } else {
      var err = new Error('All fields are required!');
      err.status = 400;
      return next(err);
    }
  })

// edit data id tertentu
router.put('/data/:id', (req, res)=>{
    var data = {
        id: req.body.id, nama: req.body.nama,
        harga: req.body.harga, berat: req.body.berat,
        stok: req.body.stok
    }
    var perintah = 
    'update produk_mainan set ? where id = ?'
    db.query(perintah, [data, req.params.id], (error, hasil)=>{
        if(error) throw error;
        console.log(hasil);
        res.send(hasil)
    })
})

// delete data id tertentu
router.delete('/data/:id', (req, res)=>{
    var perintah = 
    'delete from produk_mainan where id = ?'
    db.query(perintah, req.params.id, (error, hasil)=>{
        if(error) throw error;
        console.log(hasil);
        res.send(hasil)
    })
})

module.exports = router;