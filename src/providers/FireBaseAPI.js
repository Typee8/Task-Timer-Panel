import app from "../firebaseConfig";
import { getDatabase, ref, set, push } from "firebase/database";

class FetchDataAPI {
  constructor() {
    this.url = `https://task-timer-panel-default-rtdb.europe-west1.firebasedatabase.app/`;
  }

  async fetchData() {}
}
