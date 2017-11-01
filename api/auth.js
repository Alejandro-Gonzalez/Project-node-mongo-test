var db = require('../db');
var hash = require('password-hash');
var randtoken = require('rand-token');

const exist = (users, email) => {
  return new Promise((resolve, reject) => {
    users.find({email}).toArray((err, data) => {
      if(err) reject(err);
      else
        resolve(Boolean(data.length))
    })
  })
};
const findSession = (sessions, token) => {
  return new Promise((resolve, reject) => {
    sessions.find({token}).toArray((err, data) => {
      if(err) reject(err);
      else{
        let user = data.length ? data[0].user : null;
        data = {exist: Boolean(data.length), user} 
        resolve(data)
      }
    })
  })
};
const removeSession = (sessions, token) => {
  return new Promise((resolve, reject) => {
    sessions.remove({token}).then((err, res) => {
      if(err) reject(err)
      else resolve(res)
    })
  })
}
const addUser  = (users, newUser)  => {
  return new Promise((resolve, reject) => {
    users.insert(newUser, (err, result) => {
      if (err)
        reject('Error');
      else{
        resolve({newRegister:'Success'});
      }
    });
  })
};


var auth = (req, res, next) => {
  if (req.session && req.session.user !== undefined)
    return next();
  else
    return res.sendStatus(401);
};

const loginUser  = (users,sessions, req)  => {
  let user = req.body;
  return new Promise((resolve, reject) => {
    users.findOne({email: user.email},(err, result) => {
      if (err)
        reject({error: "false"});
      if(result){
        const {name, password, email} = result;
        var token = randtoken.generate(16);
        if(hash.verify(user.password, password)){
          sessions.insert({
            user: email,
            token,
            date: new Date()
          })
          resolve({
            status: "OK",
            name,
            token,
            user: hash.generate(email) 
          })
        }else{
          resolve({
            status: "FAILED",
            error: 'password '
          })
        }
      }else{
        resolve({
          status: "FAILED",
          error: 'user not found'
        })
      }
    });
  })
};


exports.init  = app => {
  app.post("/users/new", (req, res) => {
    var users = db.get().collection('users');

    const {email, name, password } = req.body;
    var hashedPassword = hash.generate(password);

    const newUser = Object.assign(req.body, {password: hashedPassword});
    exist(users, email).then(exist => {
      if(exist){
        res.json({newRegister: 'failed user exist now'})
      }else{
        addUser(users, newUser).then(data => {
          res.json(data)
        })
      }
    })
  })
  
  app.post("/users/login", (req, res, next) => {
    var users = db.get().collection('users');
    const sessions = db.get().collection('sessions');

    loginUser(users, sessions, req, res).then(data => {
      res.json(data)
    }).catch(err => {
      res.json(err);
    })
  })

  app.post('/logout', (req, res) => {
    const sessions = db.get().collection('sessions');
    const {token} = req.body;
    removeSession(sessions, token).then(data => {
      res.json(data)
    }).catch(err => {
      res.json(err)
    })
  });
  
  app.post('/checklogin', (req, res) => {
    const sessions = db.get().collection('sessions');
    const {token} = req.body;
    findSession(sessions, token).then(data => {
      res.json(data)
    }).catch(err => {
      res.json(err);
    })
  });
}