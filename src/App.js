import './App.css';
import AppContainer from './component/AppContainer'
import Header from './component/Header';
import styles from './component/styles/All.module.css'

function App() {
  return (
    <div className={styles.container}>
      <Header/>
      <AppContainer/> 
    </div>
  );
}

export default App;
