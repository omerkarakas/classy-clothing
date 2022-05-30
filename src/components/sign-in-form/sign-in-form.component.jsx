import { useState, useContext } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import {UserContext} from '../../context/user.context';

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss';



const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const {setCurrentUser} = useContext(UserContext);
  //console.log(formFields);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const singInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
    console.log("user signed in successfully with google");
  }

  
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const {user} = await signInAuthUserWithEmailAndPassword(email, password);
  
      console.log("user signed in successfully using email and password");
      
      setCurrentUser(user);

      resetFormFields();

    } catch (error) {
      
      switch (error.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
          alert("Cannot sign in. Check email and password information");
          break;
        default:
          console.log("Login error:",error);
      }

    }

  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    
    //setFormFields({...formFields, [name]: value})
    
    //OR:
    formFields[name] = value;
    setFormFields({ ...formFields });

  };


  return (
    <div className='sign-in-container'>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>

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

        <div className='buttons-container'>
         <Button type="submit">Sign In</Button>
         <Button type="button" buttonType="google" onClick={singInWithGoogle}>Google Sign In</Button>
        </div>

      </form>
    </div>
  );
}

export default SignInForm;