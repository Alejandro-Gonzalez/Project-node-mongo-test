var db = require('../db');
/* Endpoint to finder recipes*/
exports.init = app => {
  app.get('/api/recipes', (req, res) => {
    var recipes = db.get().collection('recipes')
    
    let query = {};

    let objQuerys = Object.keys(req.query).reduce((acum, key)=> {
      if(typeof req.query[key] == "string")
        acum[key] = {$regex: new RegExp(`^.*${req.query[key]}.*$`, "i")};
      if(typeof req.query[key] == "object" &&  req.query[key].constructor.name == "Array")
        acum[key] = {$in : req.query[key]};
      return acum
    }, {});
    
    if(Object.keys(objQuerys).length > 1){
      const multipleQuerys = {};
      multipleQuerys['$and'] = Object.keys(objQuerys).reduce((acum, key)=>{
        const field = {[key] : objQuerys[key]};
        acum.push(field);
        return acum;
      },[])
      objQuerys = multipleQuerys;
    } 
    query = objQuerys;

    recipes.find(query).toArray((err, data)=> {
      res.json(data)
    })
  })

}
