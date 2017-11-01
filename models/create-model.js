var db = require('../db');

exports.ModelCreate = (req, res) => {
   let ingredients = new Promise((resolve, reject)=> {
      db.get().collection('ingredients').find().toArray((err, data)=>{
        if(err) reject(err)
        resolve(data || [])
      })
    });

  let restrictions = new Promise((resolve, reject)=> {
    db.get().collection('restrictions').find().toArray((err, data)=>{
      if(err) reject(err)
      resolve(data || [])
    })
  })

  Promise.all([ingredients, restrictions]).then(values => {
    res.render('create',{ ingredients: values[0], restrictions:values[1]});
  })
};