import AppRouter from "./page-router/AppRouter";
import useFetchUser from "./useFetchUser";

function App() {
  const { init, isLoggedIn, userObj } = useFetchUser();
  
  return (
    <div className="App">
      {init && 
      <AppRouter 
      isLoggedIn={isLoggedIn}
      userObj={userObj}
      />
      }
    </div>
  );
}

export default App;
