import React,{useContext} from 'react';
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../App'
const NavBar = () => {
  const {state, dispatch} = useContext(UserContext);
  const history = useHistory();

  const renderList = () =>{
    if(state){
      return [
        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/create" >CreatePost</Link></li>,
        <button className="btn  red darken-1" type="submit" onClick = {() => {
          localStorage.clear();
          dispatch({type:"CLEAR"})
          history.push('/signin')
        } } >Logout</button>
      ]
    }else{
      return [
        <li><Link to="/signup">SignUP</Link></li>,
        <li><Link to="/signin" >SignIn</Link></li>
      ]
    }
  }
    return ( 
        <nav>
    <div className="nav-wrapper">
      <Link to= {state?"/":"/signin"} className="brand-logo left">Logo</Link>
      <ul id="nav-mobile" className="right">
      {renderList()}
        
      </ul>
    </div>
  </nav>

     );
}
 
export default NavBar;