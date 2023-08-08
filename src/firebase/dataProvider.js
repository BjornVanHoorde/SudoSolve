/* -----------------------------------------
IMPORTS
----------------------------------------- */
import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "src/auth/FirebaseContext";
import { snapshot_users } from "./apis/users";
import { snapshot_sudokus } from "./apis/sudokus";
import { snapshot_savedSudokus } from "./apis/savedSudokus";
import { snapshot_userSudokus } from "./apis/userSudokus";

/* -----------------------------------------
GLOBALS
----------------------------------------- */
const initialState = {
  users: [],
  sudokus: [],
  savedSudokus: [],
  userSudokus: [],
};

/* -----------------------------------------
EXPORT - context
----------------------------------------- */
export const dataContext = createContext({
  ...initialState,
});

/* -----------------------------------------
EXPORT - provider
This is the main component that is wrapped around the app. This will trigger on changes and more.
----------------------------------------- */
export const DataProvider = (props) => {
  // variables
  const children = props.children;
  const { isAuthenticated, addSubscribes, user } = useContext(AuthContext);

  // states
  const [users, setusers] = useState([]);
  const [sudokus, setsudokus] = useState([]);
  const [savedSudokus, setsavedSudokus] = useState([]);
  const [userSudokus, setuserSudokus] = useState([]);

  useEffect(() => {
    let snapUsers;
    let snapSudokus;
    let snapSavedSudokus;
    let snapUserSudokus;

    if (isAuthenticated) {
      snapUsers = snapshot_users(setusers);
      snapSudokus = snapshot_sudokus(setsudokus);
      snapSavedSudokus = snapshot_savedSudokus(setsavedSudokus, user.userId);
      snapUserSudokus = snapshot_userSudokus(setuserSudokus, user.userId);
      return () => {
        snapUsers();
        snapSudokus();
        snapSavedSudokus();
        snapUserSudokus();
      };
    }
  }, [isAuthenticated]);

  return (
    <dataContext.Provider
      value={{
        users,
        sudokus,
        savedSudokus,
        userSudokus,
      }}
    >
      {children}
    </dataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const DataConsumer = dataContext.Consumer;
