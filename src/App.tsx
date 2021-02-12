import './App.less';
import MainApp from "../src/containers/MainApp";
import UserContainer from './unstated/UserContainer';
import MainLogin from './containers/components/LoginMain';

function App() {

  const userState = UserContainer.useContainer();
  return (
    <div className="App">
      { userState.user ? <MainApp /> : <MainLogin/>}
    </div>
  );
}

export default App;
