let initialState = initialState || {};

export const restrictions = (state = initialState.restrictions || [], action) => {
  switch(action.type) {
    case "ADD_RESTRICTIONS":
      return [...state, ...action.payload.restrictions]
      break;
    default:
      return state;
  }
};

export const ingredients = (state = initialState.ingredients || [], action) => {
  switch(action.type) {
    case "ADD_INGREDIENTS":
      return [...state, ...action.payload.ingredients]
      break;
    default:
      return state;
  }
};

export const recipes = (state = [], action) => {
  switch(action.type) {
    case "GET_RECIPES":
      return [...state, ...action.payload.recipes]
      break;
    case "CREATE_RECIPE":
      return [...state, action.payload]
      break;
    default:
      return state;
  }
};

