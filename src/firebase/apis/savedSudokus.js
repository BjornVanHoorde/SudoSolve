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

export const initialStateSavedSudoku = {
  sudokuId: "",
  userId: "",
  title: "",
  difficulty: "",
  originalSudokuId: "",
  isSolved: false,
  time: {
    minutes: 0,
    seconds: 0,
  },
  board: [],
};

// --- SNAPSHOT --------------------------------
export const snapshot_savedSudokus = (state) => {
  return onSnapshot(collection(firestore, "savedSudokus"), (result) => {
    try {
      if (result.docs.length != 0) {
        state(result.docs.map((doc) => doc.data()));
      } else {
        state([]);
      }
    } catch (error) {
      console.log(
        "[apis] (savedSudokus - snapshot_savedSudokus) cannot get savedSudokus of snapshot: ",
        error
      );
      state([]);
    }
  });
};

// --- ACTIONS ---------------------------------
export const fb_update_savedSudoku = (id, data) => {
  try {
    return updateDoc(doc(firestore, "savedSudokus", id), {
      ...data,
      dateEdited: new Date(),
    });
  } catch (error) {
    console.error(
      "[APIS - savedSudokus] ( update_savedSudoku ) - Failed to update savedSudoku => ",
      error
    );
  }
};
export const fb_create_savedSudoku = (data) => {
  try {
    return addDoc(collection(firestore, "savedSudokus"), {
      ...data,
      dateCreated: new Date(),
    })
      .then((r) => {
        return fb_update_savedSudoku(r.id, {
          sudokuId: r.id,
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  } catch (error) {
    console.error(
      "[APIS - savedSudokus] ( create_savedSudoku ) - Failed to create savedSudoku => ",
      error
    );
  }
};

export const fb_delete_savedSudoku = (id) => {
  try {
    return deleteDoc(doc(firestore, "savedSudokus", id));
  } catch (error) {
    console.error(
      "[APIS - savedSudokus] ( delete_savedSudoku ) - Failed to delete savedSudoku => ",
      error
    );
  }
};
