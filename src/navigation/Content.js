import { useState } from "react";
import { UserContext } from "../store/UserContext";

import { Main } from "./Main";

function Content() {
  const [user, setUser] = useState(null);
  console.log("user", user);

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
