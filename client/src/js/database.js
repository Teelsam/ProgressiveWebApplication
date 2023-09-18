import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

//  Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.error('putDb implemented');
  const jateDb = await openDB('jate', 1);//create a connection to db
  const transAct = jateDb.transaction('jate', readwrite);//create a transaction plus specify database and privilages
  const store = transAct.objectStore('jate');//open object store
  const request = store.add({ id: 1, value: content });//add content to store
  const resCheck = await request;//checks the request
  console.log('data saved: ', resCheck);//prints the request
}

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.error('getDb implemented');
  const jateDb = await openDB('jate', 1);//creates a connection to the db
  const transAct = jateDb.transaction('jate', 'readonly');//new transaction and data privileges
  const store = transAct.objectStore('jate'); // open store
  const request = store.getAll();//get all the data in the database
  const resCheck = await request;//checks request
  console.log('request! :', resCheck);//prints request result
}
initdb();
