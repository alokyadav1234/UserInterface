import React,{useEffect, createContext, useReducer, useContext} from 'react';
import {BrowserRouter,Route,Switch, useHistory} from "react-router-dom"
import "./App.css"
import NavBar from "./components/NavBar"
import CreatePost from "./components/screens/CreatePost"
import Home from "./components/screens/Home"
import Profile from "./components/screens/Profile"
import SignIn from "./components/screens/SignIn"
import SignUp from "./components/screens/SignUp"
import UserProfile from "./components/screens/UserProfile"
import {reducer, initialState} from "./reducers/Reducer"

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const {state, dispatch} = useContext(UserContext);
   useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER", payload:user})
      history.push('/')
    }else{
      history.push('/signin')
    }
  })
  return(
    <Switch>
    <Route exact path = "/"><Home/></Route>
    <Route path = "/signup"><SignUp/></Route>
    <Route path = "/signin"><SignIn/></Route>
    <Route path = "/profile"><Profile/></Route>
    <Route path = "/create"><CreatePost/></Route>
    <Route path = "/profile/:userId"><UserProfile/></Route>
    </Switch>
    
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value= {{state, dispatch}}>
    <BrowserRouter>
       <NavBar/>
       <Routing/>
       </BrowserRouter>
       </UserContext.Provider>

    
  );
}

export default App;
