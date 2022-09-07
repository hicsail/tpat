import { useEffect, useState } from "react";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { UserContext } from "../store/UserContext";

import { Main } from "./Main";

function Content() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const credentialsObject = localStorage.getItem(STORAGE_KEYS.CREDENTIALS);
    if (credentialsObject) {
      const savedCredentials = JSON.parse(credentialsObject);
      if (savedCredentials) {
        console.log("retrieved credentials from storage:", savedCredentials);
        setUser(savedCredentials);
      }
    }
  }, []);

  const providerValue = {
    user,
    setUser,
  };
  return (
    <UserContext.Provider value={providerValue}>
      <Main />
    </UserContext.Provider>
  );
}

export default Content;
