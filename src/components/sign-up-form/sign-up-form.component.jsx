import {   useState } from "react";
import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles';
import Button from "../button/button.component";
import { SignUpContainer } from "./sign-up-form.styles";
import { useDispatch } from "react-redux";
import { signUpStart } from "../../store/user/user.action";


const defaultFormFields = {
          displayName : '',
          email: '',
          password: '',
          confirmPassword:'',
}

const SignUpForm = () =>{
          const dispatch = useDispatch();
          const [formFields, setFormFields]=useState(defaultFormFields);
          const {displayName , email , password , confirmPassword}=formFields;
         
         
          const resetFormFields=()=>{
                    setFormFields(defaultFormFields);
          }
          const handleSubmit = async(event)=>{
                    console.log('handle submit');
                    event.preventDefault();
                    if(password !== confirmPassword){
                              alert("passwords do not match");
                              return;
                    }
                    try{
                    dispatch(signUpStart(email,password,displayName));
                    resetFormFields();
          }
                    catch(error){
                         if(error.code === 'auth/email-already-in-use'){
                         alert('user already exists');
                         }
                         console.log(error);
                    }
          }
          const handleChange = (event) => {
                   
                    const {name,value}=event.target;
                    setFormFields({...formFields,[name]:value});
          }
          
          return(


                    <SignUpContainer>
                              <h2>Don't have an account</h2>
                              <span>Sign up with your email and password</span>
                              <form onSubmit={handleSubmit}>
                              <FormInput label="Display Name"required type="text" onChange={handleChange} name="displayName" value={displayName}/>
                              <FormInput label="Email" required type="email" onChange={handleChange} name="email" value={email}/>
                              <FormInput label="Password" required type="password" onChange={handleChange} name="password" value={password}/>
                              <FormInput label="Confirm Password" required type="password" onChange={handleChange} name="confirmPassword" value={confirmPassword}/>
                              <Button type="submit">Sign Up </Button>
                              </form>
                    </SignUpContainer>
          );
};
export default SignUpForm;