import {Outlet,Link} from 'react-router-dom';
import { Fragment, useContext } from 'react';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import {UserContext} from '../../contexts/user.context'
import { signOutUser } from '../../utils/firebase/firebase.utils';
import './navigation.styles.scss';

const Navigation =()=>{
  const {currentUser,setCurrentUser} = useContext(UserContext);

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
                    </div>
              </div>
              <Outlet/>
            </Fragment>
          );
        }
 export default Navigation;