import { useState } from 'react';
import './sign-in-form.styles';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import { ButtonsContainer, SignInContainer } from './sign-in-form.styles';
import { useDispatch } from 'react-redux';
import { emailSignInStart, googleSignInStart } from '../../store/user/user.action';

const defaultFormFields = {
  email:'',
  password: '',
}  
const SignIn = () => {
  
  const dispatch=useDispatch();
  const [formFields,setFormFields]=useState(defaultFormFields);
  const {email ,password }=formFields;

  const handleSubmit= async (event)=>{
    event.preventDefault();
    try{
     dispatch(emailSignInStart(email,password));
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
    dispatch(googleSignInStart());

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
    <SignInContainer>
      <h2>I already have an account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
      <FormInput label="Email" required type="email" onChange={handleChange} name="email" value={email}/>
      <FormInput label="Password" required type="password" onChange={handleChange} name="password" value={password}/>
      <ButtonsContainer>
        <Button type="submit">Sign In</Button>
        <Button buttonType={BUTTON_TYPE_CLASSES.google} type='button' onClick={signInWithGoogle}>Google Sign In</Button>
      </ButtonsContainer>
      </form>
      
    </SignInContainer>
    
  );
};

export default SignIn;
