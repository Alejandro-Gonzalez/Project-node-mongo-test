import Utils from './utils/Utils'
import axios from 'axios';

class App{
  constructor() {
    this.bindings()
    this.count = 0;
  }
  create(form){
    const inputs = $(form).find(".js-field").get();
    
    let fields = Utils.fieldForm(form, "js-field");
    let validation = Utils.isValid(fields);

    if(validation.isValid){
      axios({
        method: 'post',
        url: '/api/recipes/new',
        data: Utils.formData(fields) 
      }).then(e => {
          form.reset()
      })
    }
  }
  search(form){
    const inputs = $(form).find(".js-field").get();
    
    let fields = Utils.fieldForm(form, "js-field");
    let validation = Utils.isValid(fields);
    console.log(validation)
    if(validation.isValid){
       axios({
        method: 'get',
        url: '/api/recipes',
        params: Utils.formData(fields) 
      }).then(res => {
        const contentRecipes = document.querySelector(".js-recipes");
        contentRecipes.innerHTML = "";

        res.data.map(recipe => {
          var container = document.createElement("DIV"); 
          var htmlData= `
                      <p>${recipe.name}</p>
                      <p>${recipe.detail}</p>
                      <p>${recipe.ingredients}</p>
                      <p>${recipe.restrictions}</p>
                  `;
          container.innerHTML = htmlData;
          contentRecipes.appendChild(container);
        })
      })
    }
  }

  bindings(){
    $(document)
      .on("submit", ".js-create-form", event => {
        event.preventDefault()
        this.create(event.currentTarget)
      })
      .on("submit", ".js-search", event => {
        event.preventDefault()
        this.search(event.currentTarget)
      })
  }
}

new App();