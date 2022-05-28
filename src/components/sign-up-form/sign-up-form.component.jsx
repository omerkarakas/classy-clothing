import { useState } from 'react';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import FormInput from '../form-input/form-input.component';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword} = formFields;

  console.log(formFields);

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
      console.log(user);

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();

    } catch (error) {
      if (error.code === "auth/email-already-in-use")
        alert("Cannot create user, email already in use");
      console.log("user creation error:",error);
    }
    

    
    //create a user doc with what it returns


  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    
    //setFormFields({...formFields, [name]: value})
    
    //OR:
    formFields[name] = value;
    setFormFields({ ...formFields });

  };


  return (
    <div>
      <h1>Sign up with your email and password</h1>
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
          name="confirm-password"
          required
          onChange={handleChange}
          value={confirmPassword} />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;