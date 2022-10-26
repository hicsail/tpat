import Content from "../../navigation/Content";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { STORAGE_KEYS } from "../../constants/storageKeys";
import { UserContext } from "../../store/UserContext";

const TAG = "Layout.js ";

function Layout() {
  const [user, setUser] = useState(null);
  const [
    attemptedToRetrieveStoredCredentials,
    setAttemptedToRetrieveStoredCredentials,
  ] = useState(false);

  useEffect(() => {
    // localStorage.removeItem(STORAGE_KEYS.CREDENTIALS);
    const credentialsObject = localStorage.getItem(STORAGE_KEYS.CREDENTIALS);
    if (credentialsObject) {
      const savedCredentials = JSON.parse(credentialsObject);
      if (savedCredentials) {
        console.log(
          TAG,
          "retrieved credentials from storage:",
          savedCredentials
        );
        setUser({ ...savedCredentials, camMicCheckComplete: null });
      }
    }
    setAttemptedToRetrieveStoredCredentials(true);
  }, []);

  const providerValue = {
    user,
    setUser,
  };
  if (!attemptedToRetrieveStoredCredentials) {
    return <CircularProgress />;
  }
  return (
    <UserContext.Provider value={providerValue}>
      <>
        <Navigation />
        <Content />
        <Footer />
      </>
    </UserContext.Provider>
  );
}

export default Layout;
