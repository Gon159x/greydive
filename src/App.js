import './App.css';
import Form from './Components/Form/Form.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {  getFirestore } from "firebase/firestore";
import { Routes , Route } from 'react-router-dom'
import 'firebase/firestore';
import React from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";

alert('Esta pagina es web responsive')

function App() {

  const [database, setDatabase] = React.useState(null)
  const [showed , setShowed] = React.useState(false)



  React.useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyAwQHEGT7xtHpQpM1KL2eOPTcuTUiFovms",
      authDomain: "base-de-datos-e6a80.firebaseapp.com",
      projectId: "base-de-datos-e6a80",
      storageBucket: "base-de-datos-e6a80.appspot.com",
      messagingSenderId: "1075856020272",
      appId: "1:1075856020272:web:cb7145d6feadff20d5aef5",
      measurementId: "G-06EQNTP49F"
    };
  
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const auxDatabase = getFirestore(app);
    setDatabase(auxDatabase)

    

  },[])


  return (
    <div className="App">
      <Routes>
        <Route path = '/' element ={<Form readOnly={false} database={database}/>} />
        <Route path = '/form/:id' element = {<Form readOnly={true} database={database}/>}/>
      </Routes>
    </div>
  );
}

export default App;
