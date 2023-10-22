import {Outlet} from 'react-router-dom';
import { useSelector ,useDispatch} from 'react-redux';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import { Fragment} from 'react';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import CartDropDown from '../../components/cart-dropdown/cart-dropdown.component';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';
import { NavigationContainer , NavLink ,NavLinks,LogoContainer } from './navigation.styles';
import { signOutStart } from '../../store/user/user.action';



const Navigation =()=>{
  const dispatch = useDispatch();
  const currentUser=useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const SignOutHandler = async ()=>{
    dispatch(signOutStart());
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