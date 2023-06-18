import {Outlet} from 'react-router-dom';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import { Fragment, useContext } from 'react';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import {UserContext} from '../../contexts/user.context'
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartDropDown from '../../components/cart-dropdown/cart-dropdown.component';
import { CartContext}  from '../../contexts/cart.context';
import { NavigationContainer , NavLink ,NavLinks,LogoContainer } from './navigation.styles';

const Navigation =()=>{
  const {currentUser,setCurrentUser} = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext);
  const SignOutHandler = async ()=>{
    await signOutUser();
    setCurrentUser(null);
  }
          return (
            <Fragment>
              <NavigationContainer>
                    <LogoContainer to='/'>    
                             <CrwnLogo className='logo'/>
                    </LogoContainer>  
                    <NavLinks>
                              <NavLink  to='/shop'>
                              SHOP
                              </NavLink>
                    
                    {
                             currentUser?( <NavLink as='span' onClick={SignOutHandler}>
                              SIGN OUT
                              </NavLink> ):(
                              <NavLink  to='/auth'>
                              SIGN IN
                              </NavLink> )
                    }
                    <CartIcon/>
                    </NavLinks>
                    {isCartOpen && <CartDropDown/>}
              </NavigationContainer>              
              <Outlet/>
            </Fragment>
          );
        }
 export default Navigation;