var db = require('../db');

const getRecipes = (skip = 0) => {
  return new Promise((resolve, reject)=> {
    db.get().collection('recipes').find().skip(skip).limit(10).toArray((err, data)=>{
      if(err) reject(err)
      resolve(data || [])
    })
  })
}

exports.init = app => {
  /*Endpoint get all ingredients*/
  app.get('/api/getAllIngredients', (req, res) => {
    db.get().collection('ingredients').find().toArray((err, data)=>{
      if(err) res.json(err)
      res.json(data)
    })
  })
  /*Endpoint get all restrictions*/
  app.get('/api/getAllRestrictions', (req, res) => {
    db.get().collection('restrictions').find().toArray((err, data)=>{
      if(err) res.json(err)
      res.json(data)
    })
  })
}


