import NavBar from './components/nav/nav';
import PageRoutes from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <PageRoutes />
      <ToastContainer position='top-center' />
    </div>
  );
}

export default App;
