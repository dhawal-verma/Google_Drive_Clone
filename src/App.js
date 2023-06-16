import Header from "./Header";
import Sidebar from "./Sidebar";
import Data from "./Data"
import { useState } from "react";
import {auth,provider} from './firebase'
import {  signInWithPopup} from "firebase/auth";
function App() {
  const signIn = ()=>{
    
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    // const credential = provider.credentialFromResult(result);
    // const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    setUser(user)
  }).catch((error) => {
    alert(error.message)
    // ...
  });

  }
  const [user,setUser] = useState(null)
  return (
   user ?  <>
   <Header photoURL = {user.photoURL} user={user}/>      
 <div className="App">
    <Sidebar />
    <Data />
 </div>
 </> : (<div className="loginWrap"> 
  <img alt='logo' src = 'data:image/png;base64,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'/>
  <button onClick={signIn}>Login to Google Drive clone</button>
 </div>)
  );
}

export default App;
