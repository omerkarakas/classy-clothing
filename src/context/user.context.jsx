import { createContext, useState } from "react";

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

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
  //children: what is wrapped inside, app e.g.:
  // <UserProvider> 
  //     <app/>
  // </UserProvider>
  //value: actual contextual values 
  
  //UserProvider: allowing its child components to access the values inside of useState
}



