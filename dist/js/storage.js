class Storage {
  initStorage() {
    const idb = new Dexie('witnsxl');
    idb.version(1).stores({ launches: '_id' });
    idb.open().then(console.log('[LOG] indexedDB Open'));
    return idb;
  }
}
