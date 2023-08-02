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
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const app = initializeApp(FIREBASE_API);
const firestore = getFirestore(app);
const storage = getStorage(app);

export const initialStateSudoku = {
  sudokuId: "",
  title: "",
  difficulty: "",
  board: [],
};

// --- SNAPSHOT --------------------------------
export const snapshot_sudokus = (state) => {
  return onSnapshot(collection(firestore, "sudokus"), (result) => {
    try {
      if (result.docs.length != 0) {
        state(result.docs.map((doc) => doc.data()));
      } else {
        state([]);
      }
    } catch (error) {
      console.log(
        "[apis] (sudokus - snapshot_sudokus) cannot get sudokus of snapshot: ",
        error
      );
      state([]);
    }
  });
};

// --- ACTIONS ---------------------------------
export const fb_update_sudoku = (id, data) => {
  try {
    return updateDoc(doc(firestore, "sudokus", id), {
      ...data,
      dateEdited: new Date(),
    });
  } catch (error) {
    console.error(
      "[APIS - sudokus] ( update_sudoku ) - Failed to update sudoku => ",
      error
    );
  }
};
export const fb_create_sudoku = (data) => {
  try {
    return addDoc(collection(firestore, "sudokus"), {
      ...data,
      dateCreated: new Date(),
    })
      .then((r) => {
        return fb_update_sudoku(r.id, {
          sudokuId: r.id,
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  } catch (error) {
    console.error(
      "[APIS - sudokus] ( create_sudoku ) - Failed to create sudoku => ",
      error
    );
  }
};

export const fb_delete_sudoku = (id) => {
  try {
    return deleteDoc(doc(firestore, "sudokus", id));
  } catch (error) {
    console.error(
      "[APIS - sudokus] ( delete_sudoku ) - Failed to delete sudoku => ",
      error
    );
  }
};

export const fb_uploadPicture = (id, file, fileName) => {
  try {
    const storageRef = ref(storage, `sudokus/${id}/${fileName}`);
    return uploadBytesResumable(storageRef, file);
  } catch (error) {
    console.error(
      "[APIS - sudokus] ( uploadPicture ) - Failed to upload picture => ",
      error
    );
  }
};
