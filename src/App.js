import {Routes,Route} from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import SignIn from './components/SignIn/Sign-in.component';
const App=()=>{
  const Shop=()=>{
    return (
      <h1>Shop</h1>
    );
  }
 
  return(
    <Routes>
      <Route path='/' element={<Navigation/>}>
      <Route index='true' element={<Home/>}/>
      <Route path='shop' element={<Shop/>}/>
      <Route path='sign-in' element={<SignIn/>}/>


      </Route>
      
    </Routes>
     );

}

export default App;
