import {UserProvider} from './context';
import NavBar from './components/nav/nav';
import PageRoutes from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <UserProvider>
      <NavBar />
      <PageRoutes />
      <ToastContainer position='top-center' />
    </UserProvider>
  );
}

export default App;
