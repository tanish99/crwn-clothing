import { useState } from 'react';
import {  
          signInWithGooglePopup, 
          signInAuthUserWithEmailAndPassword
        } from '../../utils/firebase/firebase.utils';
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
      await signInAuthUserWithEmailAndPassword(email,password);
    }
    catch(error){
      switch(error.code){
        case "auth/wrong-password":
          alert("incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        case "auth/popup-closed-by-user":
          alert("sign in pop up closed");
          break;
          case "auth/cancelled-popup-request":
            alert("sign in pop up closed");
            break;
          default:
            alert('unknown error');
            break;

      }}

  
  }
  // console.log(formFields);
  const handleChange=(event)=>{
    const {name,value}=event.target;
    setFormFields({...formFields,[name]:value});
  }
  const signInWithGoogle = async () => {
    try{
     await signInWithGooglePopup();

    }catch(error){
      switch(error.code){
      case "auth/popup-closed-by-user":
          alert("sign in pop up closed");
          break;
      default:
            alert('unknown error');
            break;

      }
    }
    
  };
  


  return (
    <div className="sign-in-container">
      <h2>I already have an account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
      <FormInput label="Email" required type="email" onChange={handleChange} name="email" value={email}/>
      <FormInput label="Password" required type="password" onChange={handleChange} name="password" value={password}/>
      <div className='buttons-container'>
        <Button type="submit">Sign In</Button>
        <Button   type='button' buttonType="google" onClick={signInWithGoogle}>Google Sign In</Button>
      </div>
      </form>
      
    </div>
    
  );
};

export default SignIn;
