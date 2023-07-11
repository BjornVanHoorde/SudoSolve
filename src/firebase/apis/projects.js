import { collection , onSnapshot , doc , updateDoc , addDoc , deleteDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { FIREBASE_API } from '../../config-global';

const app = initializeApp( FIREBASE_API ); 
const firestore = getFirestore(app);

export const initialStateProject = {
    'id': '',
    'name': '',
    'count': '',
    'contact': {
        'person': '',
        'email': '',
    },
    'dateCreated': null,
    'dateEdited': null,
}


// --- SNAPSHOT --------------------------------
export const snapshot_projects = ( state ) => {

    return onSnapshot( collection( firestore , "projects") , ( result ) => {
    
            try {
    
                if (result.docs.length != 0) {
                    state( result.docs.map(doc => doc.data()));
                } else {
                    state([]);
                }
                console.info("[apis] (projects - snapshot_projects) " , result.docs);
    
            } catch (error) {
    
                console.log("[apis] (projects - snapshot_projects) cannot get projects of snapshot: " , error);
                state([]);
    
            }

        });

}

// --- ACTIONS ---------------------------------
export const fb_update_project = ( id , data ) => {

    try {
        
        console.info("[APIS - projects] ( update_project ) - Trying to update project with id => " , id );
        return updateDoc( doc(firestore , "projects" , id ) , { ...data , dateEdited: new Date() } );

    } catch (error) {
        console.error("[APIS - projects] ( update_project ) - Failed to update project => " , error );
    }

}
export const fb_create_project = ( data ) => {

    try {
        
        console.info("[APIS - projects] ( create_project ) - Trying to create project => " , data );

        return addDoc( collection(firestore , "projects") , { ...data , dateCreated: new Date() } )
        .then(  r => {

            return update_project( r.id , {
                id: r.id,
            } );
        })
        .catch( err => {

            throw new Error( err );

        });

    } catch (error) {
        console.error("[APIS - projects] ( create_project ) - Failed to create project => " , error );
    }

}
export const fb_delete_project = ( id ) => {

    try {
        
        console.info("[APIS - projects] ( delete_project ) - Trying to delete project => " , id );
        return deleteDoc( doc(firestore , "projects" , id ) );

    } catch (error) {
        console.error("[APIS - projects] ( delete_project ) - Failed to delete project => " , error );
    }

}