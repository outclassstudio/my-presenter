const DB_NAME = "Video-Generator";
const DB_VERSION = 1;
let DB;

export default {
  async getDb() {
    return new Promise((resolve, reject) => {
      if (DB) {
        return resolve(DB);
      }
      console.log("OPENING DB", DB);
      let request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = (e) => {
        console.log("Error opening db", e);
        reject("Error");
      };

      request.onsuccess = (e) => {
        DB = e.target.result;
        resolve(DB);
      };

      request.onupgradeneeded = (e) => {
        console.log("onupgradeneeded");
        let db = e.target.result;
        let objectStore = db.createObjectStore("video-generator", {
          keyPath: "id",
        });
        // objectStore.createIndex("background", "background", { unique: false });
        // objectStore.createIndex("transition", "transition", { unique: false });
        // objectStore.createIndex("slideTime", "slideTime", { unique: false });
        // objectStore.createIndex("subtitle", "subtitle", { unique: false });
      };
    });
  },

  async getData() {
    let db = await this.getDb();

    return new Promise((resolve) => {
      let trans = db.transaction(["video-generator"], "readonly");
      let store = trans.objectStore("video-generator");
      let data = store.getAll();
      data.onsuccess = (e) => resolve(e.target.result);
    });
  },

  async getOneData(id) {
    console.log("check id", id);
    let db = await this.getDb();

    return new Promise((resolve) => {
      let trans = db.transaction(["video-generator"]);
      let store = trans.objectStore("video-generator");
      let data = store.get(Number(id));
      data.onsuccess = (e) => {
        resolve(e.target.result);
      };
    });
  },

  async addData(data) {
    const target = {};
    const newData = Object.assign(target, data);

    let db = await this.getDb();

    return new Promise((resolve) => {
      let trans = db.transaction(["video-generator"], "readwrite");
      trans.oncomplete = () => {
        resolve();
      };

      let store = trans.objectStore("video-generator");
      store.add(newData);
    });
  },

  async editData(data) {
    const target = {};
    const newData = Object.assign(target, data);

    let db = await this.getDb();

    return new Promise((resolve) => {
      let trans = db.transaction(["video-generator"], "readwrite");
      trans.oncomplete = () => {
        resolve();
      };

      let store = trans.objectStore("video-generator");
      store.put(newData);
    });
  },

  async deleteData(data) {
    let db = await this.getDb();

    return new Promise((resolve) => {
      let trans = db.transaction(["video-generator"], "readwrite");
      trans.oncomplete = () => {
        resolve();
      };

      let store = trans.objectStore("video-generator");
      store.delete(data);
    });
  },

  async clearData() {
    let db = await this.getDb();
    let trans = db.transaction(["video-generator"], "readwrite");
    let store = trans.objectStore("video-generator");
    store.clear();
  },
};
