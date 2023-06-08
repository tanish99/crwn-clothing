import {Routes,Route} from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import Authentication from './routes/authentication/authentication.component';
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
        <Route path='sign-in' element={<Authentication/>}/>


      </Route> 
      
    </Routes>
     );

}

export default App;
