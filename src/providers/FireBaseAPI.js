import app from "../firebaseConfig";
import { getDatabase, ref, set, push, get, remove } from "firebase/database";

class FirebaseFetchDataAPI {
  async fetchData() {
    const db = getDatabase(app);
    const dbRef = ref(db, "/data");
    const snapshot = await get(dbRef);
    let resultArray = [];
    if (snapshot.exists()) {
      const result = snapshot.val();
      for (const key in result) {
        const newObj = {
          id: key,
          ...result[key],
        };

        resultArray.push(newObj);
      }
    } else {
      console.log("Fetch data fails!");
    }

    return resultArray;
  }

  async pushData(obj) {
    const db = getDatabase(app);
    const dbRef = ref(db, "/data");
    try {
      await push(dbRef, obj);
      console.log("Data pushed successfully!");
    } catch (error) {
      throw new Error(`PUSH - failed, status: ${error}`);
    }
  }

  async removeData(id) {
    const db = getDatabase(app);
    const dbRef = ref(db, `/data/${id}`);
    await remove(dbRef);
  }
  /*   async putData(obj) {
    const db = getDatabase(app);
    const dbRef = ref(db, "/data");
    const pushedItemRef = push(dbRef);

    try {
      await set(pushedItemRef, obj);
      console.log("Data putted successfully!");
    } catch (error) {
      throw new Error(`PUT - failed, status: ${error}`);
    }
  } */
}

export default FirebaseFetchDataAPI;
