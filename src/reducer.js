export const initialState = {
  user: null,
  // code was changed from a js keyword to a string - why user login is not required
};

export const actionTypes = { SET_USER: 'SET_USER' };

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;
