import { useState } from 'react';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { SignUpContainer } from './sign-up-form.styles';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword} = formFields;

  //const { setCurrentUser } = useContext(UserContext);
  

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    //confirm passwords matches
    if (password !== confirmPassword) {
      alert("passwords do not match"); 
      return;
    }

    try {
      //if we are authenticated that user with email and password
      const {user} = await createAuthUserWithEmailAndPassword(email, password);
      
      await createUserDocumentFromAuth(user, { displayName });

      //setCurrentUser(user);
      resetFormFields();
      console.log("user signed up successfully");

    } catch (error) {
      if (error.code === "auth/email-already-in-use")
        alert("Cannot create user, email already in use");
      console.log("user creation error:",error);
    }
    

    
    //create a user doc with what it returns


  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    
    setFormFields({...formFields, [name]: value})
    
    //OR:
    //formFields[name] = value;
    //setFormFields({ ...formFields });

  };


  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>

        <FormInput
          label="Display Name"
          type="text"
          id="name"
          name="displayName"
          required
          onChange={handleChange}
          value={displayName} />

        <FormInput
          label="Email"
          type="email"
          id="email"
          name="email"
          required
          onChange={handleChange}
          value={email} />

        <FormInput
          label="Password"
          type="password"
          id="password"
          name="password"
          required
          onChange={handleChange}
          value={password} />
              
        <FormInput
          label="Confirm Password"
          type="password"
          id="confirm-password"
          name="confirmPassword"
          required
          onChange={handleChange}
          value={confirmPassword} />

        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  );
}

export default SignUpForm;