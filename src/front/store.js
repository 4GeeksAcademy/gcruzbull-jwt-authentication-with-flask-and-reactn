
export const initialStore=()=>{
  return{
    message: null,
    token: localStorage.getItem("token") || null,
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };

    case 'login':
      return {
        ...store,
        token: action.payload,
      };

    case 'logout':
      return {
        ...store,
        token: localStorage.getItem("token") || null,
      };

    default:
      throw Error('Unknown action.');
  }    
}
