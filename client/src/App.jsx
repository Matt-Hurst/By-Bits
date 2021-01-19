import React, { useEffect, useState } from 'react';
import { LoginPage } from './pages/Login';
import { PolicyPage } from './pages/Policy';

import './App.scss';
import { getUserPolicy } from './apiService';

const App = () => {
  const [userPolicy, setUserPolicy] = useState();

  const checkIfLoggedIn = async () => {
    const result = await getUserPolicy();
    if (result.msg === 'Unauthenticated') {
      return;
    } else {
      setUserPolicy(result);
    }
  };

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  return (
    <div className="App" data-testid="app-container">
      {!userPolicy && <LoginPage setUserPolicy={setUserPolicy} />}
      {userPolicy && <PolicyPage userPolicy={userPolicy} />}
    </div>
  );
};

export default App;
