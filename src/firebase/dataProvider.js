/* -----------------------------------------
IMPORTS
----------------------------------------- */
import PropTypes from 'prop-types';
import { createContext, useContext, useEffect , useState } from 'react';
import { AuthContext } from 'src/auth/FirebaseContext';
import { snapshot_projects } from './apis/projects';


/* -----------------------------------------
GLOBALS
----------------------------------------- */
const initialState = {
    projects: [],
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
    const { isAuthenticated , addSubscribes } = useContext( AuthContext );

    // states
    const [ projects , setProjects ] = useState( [] );

    // variables
    let snap = () => {};


    useEffect(() => {

        let test;

        if ( isAuthenticated ){

            console.info("[DataProvider] (useEffect) - getting all the data");
    
            // Excecute snapshot for all projects
            test = snapshot_projects( setProjects );
            return () => {test()};

        }

    } , [isAuthenticated] );

    return (
        <dataContext.Provider
            value={{
                projects,

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
