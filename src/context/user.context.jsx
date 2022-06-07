import { createContext, useState, useEffect, useReducer } from "react";

import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
//as the actual value
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null
});




// provider: to be used as a wrapper for any component that needs access inside of UserContext
// this component just leverages useState exposing the value as well as the setter of the value externally.
// whatever values you want a component to be able to expose, you can expose through the context.
// We created a parent level component at the top of our app that gives us access to some component
// inside useState value,
// then inside of our respective places where either getting or using the setter
// e.g.: SignInForm: const { setCurrentUser } = useContext(UserContext);
// or we are getting and using the actual value
// e.g: Navigation : const { currentUser } = useContext(UserContext);



//using useState
/*
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubcribe = onAuthStateChangedListener((user) => { 
      setCurrentUser(user);
      console.log(user);
      if (user) {
        createUserDocumentFromAuth(user);
      }
    });

    return unsubcribe;
  }, []);
  
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
  //children: what is wrapped inside, app e.g.:
  // <UserProvider> 
  //     <app/>
  // </UserProvider>
  //value: actual contextual values 
  
  //UserProvider: allowing its child components to access the values inside of useState
}
*/


/*
reducer:  a function returning a new object
, these changing the object state and action
, returning a new object if anything has changed

const userReducer = (state,action) => { 
  return  { 
    currentUser : null / anObject 
  };
}
*/


export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER'
}

  //conditionally return back an object with those values depending on the type

const userReducer = (state, action) => {
  const { type, payload } = action; // only two possible values, latter is optional : contains values to be set
  
  console.log("dispatched, action:",action);

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,  //keep other values unchanged
        currentUser: payload
      }
    // case 'increment':
    //   return { value: state.value + 1}
    default:
      throw new Error("Unhandled type: " + type + " in userReducer");
  }

  return {
    currentUser: payload
 }
}

const INITIAL_STATE = {
  currentUser: null
}


//using reducer :
// with useState: whenever setState gets called, state gets updated and functional component re-runs.
// with reducer:  whenever dispatch gets called and a new state object is returned, then functional component re-runs.
// :reducer overperforms useState when more complex cases, proven to scale well for state management.

export const UserProvider = ({ children }) => {

  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);
  console.log(currentUser);

  //OR
  // const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
  //const { currentUser } = state;

  const setCurrentUser = (user) => {
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
  }
  
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubcribe = onAuthStateChangedListener((user) => { 
      setCurrentUser(user);
      console.log(user);
      if (user) {
        createUserDocumentFromAuth(user);
      }
    });

    return unsubcribe;
  }, []);
  
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}


