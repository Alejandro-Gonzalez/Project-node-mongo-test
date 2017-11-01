import React from 'react';

const ListRecipes = ({recipes}) => {
  return(
    <div>
      {
        recipes.map((recipe,idx) => (
          <div key={recipe.name+idx}>
            <p>{recipe.name}</p>
            <p>{recipe.detail}</p>
            <p>{recipe.ingredients}</p>
            <p>{recipe.restrictions}</p>
          </div>
        ))
      }
    </div>
  )
}

export default ListRecipes;