import {Outlet,Link} from 'react-router-dom';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import { Fragment, useContext } from 'react';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import {UserContext} from '../../contexts/user.context'
import { signOutUser } from '../../utils/firebase/firebase.utils';
import './navigation.styles.scss';
import CartDropDown from '../../components/cart-dropdown/cart-dropdown.component';
import { CartContext}  from '../../contexts/cart.context';

const Navigation =()=>{
  const {currentUser,setCurrentUser} = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext);
  const SignOutHandler = async ()=>{
    await signOutUser();
    setCurrentUser(null);
  }
  console.log("navigation",currentUser);
          return (
            <Fragment>
              <div className='navigation'>
                    <Link className='logo-container' to='/'>    
                             <CrwnLogo className='logo'/>
                    </Link>  
                    <div className='nav-links-container'>
                              <Link className='nav-link' to='/shop'>
                              SHOP
                              </Link>
                    </div>
                    <div className='nav-links-container'>
                    {
                             currentUser?( <Link className='nav-link' onClick={SignOutHandler}>
                              SIGN OUT
                              </Link> ):(
                              <Link className='nav-link' to='/auth'>
                              SIGN IN
                              </Link> )
                    }
                    <CartIcon/>
                    </div>
                    {isCartOpen && <CartDropDown/>}
              </div>              
              <Outlet/>
            </Fragment>
          );
        }
 export default Navigation;