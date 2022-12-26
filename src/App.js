import { useRoutes } from 'react-router-dom';
import './App.css';
import EditStudent from './pages/EditStudent';
import HomePage from './pages/HomePage';
function App() {
  // const { studentStore } = useStores();
  const elements = useRoutes([
    {
      path: '/student',
      element: <HomePage />,
    },
    {
      path: '/student/:id',
      element: <EditStudent />,
    },
  ]);
  return <div className="App">{elements}</div>;
}

export default App;
