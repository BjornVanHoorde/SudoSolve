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

export const initialStateUser = {
  userId: "",
  username: "",
  email: "",
  picture: {
    url: "",
    name: "",
    ref: "",
  },
  settings: {
    ARRN: true,
    HMN: true,
    HRC: true,
    HE: true,
    BA: "right",
  },
};

// --- SNAPSHOT --------------------------------
export const snapshot_users = (state) => {
  return onSnapshot(collection(firestore, "users"), (result) => {
    try {
      if (result.docs.length != 0) {
        state(result.docs.map((doc) => doc.data()));
      } else {
        state([]);
      }
    } catch (error) {
      console.log(
        "[apis] (users - snapshot_users) cannot get users of snapshot: ",
        error
      );
      state([]);
    }
  });
};

// --- ACTIONS ---------------------------------
export const fb_update_user = (id, data) => {
  try {
    return updateDoc(doc(firestore, "users", id), {
      ...data,
      dateEdited: new Date(),
    });
  } catch (error) {
    console.error(
      "[APIS - users] ( update_user ) - Failed to update user => ",
      error
    );
  }
};
export const fb_create_user = (data) => {
  try {
    return addDoc(collection(firestore, "users"), {
      ...data,
      dateCreated: new Date(),
    })
      .then((r) => {
        return fb_update_user(r.id, {
          userId: r.id,
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  } catch (error) {
    console.error(
      "[APIS - users] ( create_user ) - Failed to create user => ",
      error
    );
  }
};

export const fb_delete_user = (id) => {
  try {
    return deleteDoc(doc(firestore, "users", id));
  } catch (error) {
    console.error(
      "[APIS - users] ( delete_user ) - Failed to delete user => ",
      error
    );
  }
};
