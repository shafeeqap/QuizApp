
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import AppRouter from './router/appRouter';

const App = () => {
  return (
    <>
      <ToastContainer/>
      <AppRouter/>
    </>
  );
};

export default App;
