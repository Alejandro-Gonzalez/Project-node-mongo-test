var db = require('../db');
/* Checking new attributes to add coleccion */
const addAttributes = (data, collection) => {
  data.map(dataItem => {
    collection.find({name: {$regex: new RegExp(`^${dataItem}$`, "i")}}).toArray((err, data)=> {
      if(!data.length){
        const newRegister = {name: dataItem};
        collection.insert(newRegister)
      }
    })
  })  
}
const findSession = (sessions, token) => {
  return new Promise((resolve, reject) => {
    sessions.find({token}).toArray((err, data) => {
      if(err) reject(err);
      else
        resolve(Boolean(data.length))
    })
  })
};
var auth = (req, res, next) => {
  const sessions = db.get().collection('sessions');
  const { token } = req.headers;
  if(token == null)
    return res.sendStatus(401);
  if (findSession(sessions, token))
    return next();
  else
    return res.sendStatus(401);
};

exports.init = app => {
  /* Endpoint to post a new Recipe */
  app.post('/api/recipes/new', auth ,(req, res) => {
    var recipes = db.get().collection('recipes')
    var ingredients = db.get().collection('ingredients');
    var restrictions = db.get().collection('restrictions');

    addAttributes(req.body.ingredients, ingredients);
    addAttributes(req.body.restrictions, restrictions);

    recipes.insert(req.body, (err, result) => {
      if (err)
        res.json('Error');
      else
        res.json('Success');
    });
  });
};