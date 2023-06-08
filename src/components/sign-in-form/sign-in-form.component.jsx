import { useState } from 'react';
import {  
          signInWithGooglePopup,
          createUserDocumentFromAuth, 
          signInAuthUserWithEmailAndPassword
        } from '../../utils/firebase/firebase.utils';
import { getRedirectResult } from 'firebase/auth';
import './sign-in-form.styles.scss';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';


const defaultFormFields = {
  email:'',
  password: '',
}  
const SignIn = () => {
  
  
  const [formFields,setFormFields]=useState(defaultFormFields);
  const {email ,password }=formFields;
  const handleSubmit= async (event)=>{
    event.preventDefault();
    try{
      const response= await signInAuthUserWithEmailAndPassword(email,password);
      console.log(response);
    }
    catch(error){
      switch(error.code){
        case "auth/wrong-password":
          alert("incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
      }}

  
  }
  console.log(formFields);
  const handleChange=(event)=>{
    const {name,value}=event.target;
    setFormFields({...formFields,[name]:value});
  }
  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };
  


  return (
    <div className="sign-in-container">
      <h2>I already have an account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
      <FormInput label="Email" required type="email" onChange={handleChange} name="email" value={email}/>
      <FormInput label="Password" required type="password" onChange={handleChange} name="password" value={password}/>
      <div className="buttons-container">
      <Button type="submit">Sign In</Button>
      <Button   type='button' buttonType="google" onClick={signInWithGoogle}>Google Sign In</Button>
      </div>
      </form>
      
    </div>
    
  );
};

export default SignIn;
