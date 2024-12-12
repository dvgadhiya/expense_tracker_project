import './App.css'
import{BrowserRouter , Routes, Route} from 'react-router-dom'
import Signin from './pages/signIn';
import Signup from './pages/signup';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signin' element={<Signin />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
