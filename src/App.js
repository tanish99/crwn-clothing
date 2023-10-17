import {Routes,Route} from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component'
import Checkout from './routes/checkout/checkout.component';
import { useEffect  } from "react";
import { createAction  } from './utils/reducer/reducer.utils';
import { setCurrentUser } from './store/user/user.action';
import { useDispatch } from 'react-redux';
import { createUserDocumentFromAuth ,onAuthStateChangedListener } from './utils/firebase/firebase.utils';

const App=()=>{
  const dispatch=useDispatch();
  useEffect(() => {

    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
      console.log('setcurrentuser');
    });

    return unsubscribe;
  },[]); 
 
  return(
    <Routes>
      <Route path='/' element={<Navigation/>}>
        <Route index='true' element={<Home/>}/>
        <Route path='shop/*' element={<Shop/>}/>
        <Route path='checkout' element={<Checkout/>}/>
        <Route path='auth' element={<Authentication/>}/>


      </Route> 
      
    </Routes>
     );

}

export default App;
