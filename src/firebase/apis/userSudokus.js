import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { FIREBASE_API } from "../../config-global";

const app = initializeApp(FIREBASE_API);
const firestore = getFirestore(app);

export const initialStateUserSudoku = {
  sudokuId: "",
  title: "",
  type: "",
  board: [],
};

// --- SNAPSHOT --------------------------------
export const snapshot_userSudokus = (state) => {
  return onSnapshot(collection(firestore, "userSudokus"), (result) => {
    try {
      if (result.docs.length != 0) {
        state(result.docs.map((doc) => doc.data()));
      } else {
        state([]);
      }
    } catch (error) {
      console.log(
        "[apis] (userSudokus - snapshot_userSudokus) cannot get userSudokus of snapshot: ",
        error
      );
      state([]);
    }
  });
};

// --- ACTIONS ---------------------------------
export const fb_update_userSudoku = (id, data) => {
  try {
    return updateDoc(doc(firestore, "userSudokus", id), {
      ...data,
      dateEdited: new Date(),
    });
  } catch (error) {
    console.error(
      "[APIS - userSudokus] ( update_userSudoku ) - Failed to update userSudoku => ",
      error
    );
  }
};
export const fb_create_userSudoku = (data) => {
  try {
    return addDoc(collection(firestore, "userSudokus"), {
      ...data,
      dateCreated: new Date(),
    })
      .then((r) => {
        return fb_update_userSudoku(r.id, {
          sudokuId: r.id,
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  } catch (error) {
    console.error(
      "[APIS - userSudokus] ( create_userSudoku ) - Failed to create userSudoku => ",
      error
    );
  }
};

export const fb_delete_userSudoku = (id) => {
  try {
    return deleteDoc(doc(firestore, "userSudokus", id));
  } catch (error) {
    console.error(
      "[APIS - userSudokus] ( delete_userSudoku ) - Failed to delete userSudoku => ",
      error
    );
  }
};
