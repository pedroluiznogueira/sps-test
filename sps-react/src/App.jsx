import './App.css';
import Navbar from './components/shared/navbar/Navbar';
import RepoComponent from './components/base/repo/Repo';
import { UserProvider } from './components/context/UserContext';

function App() {
  
  return (
      <>
        <Navbar />
        <RepoComponent />
      </>
  );
}

export default App;
