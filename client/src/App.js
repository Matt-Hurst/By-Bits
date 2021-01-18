import React, { useEffect, useState } from 'react';
import { LoginPage } from './pages/Login';
import { PolicyPage } from './pages/Policy';

import './App.scss';
import { getUserPolicy } from './apiService';

const App = () => {
  const [userPolicy, setUserPolicy] = useState();
  const [loading, setLoading] = useState(false);

  const checkIfLoggedIn = async () => {
    setLoading(true);
    const result = await getUserPolicy();
    if (result === 'Unauthenticated') {
      setLoading(false);
      return;
    } else {
      setLoading(false);
      setUserPolicy(result);
    }
  };

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  return (
    <div className="App" data-testid="app-container">
      {loading && <h1>LOADING...</h1>}
      {!userPolicy && !loading && <LoginPage setUserPolicy={setUserPolicy} />}
      {userPolicy && !loading && <PolicyPage userPolicy={userPolicy} />}
    </div>
  );
};

export default App;
