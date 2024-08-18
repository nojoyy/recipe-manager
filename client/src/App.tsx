import Main from './shared/views/main/Main';
import './App.css'
import axios from 'axios';

function App() {

  const myFunc = async() => {
    try {
      console.log('attempting');
      const response = await axios.get('/api/greet');
      console.log(response.data.message);
    } catch (error) {
      console.error("error: ", error);
    }
  };

  return (
    <>
      <Main />
      <button onClick={() => myFunc()}>Test</button>
    </>
  )
}

export default App
