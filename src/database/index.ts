const { MongoClient } = require('mongodb');

const path = require('path');
const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const dbName = 'studyMongodb';

function dbConnect() {
  const client = new MongoClient(
    process.env.DATABASE_CONNECTION_STRING,
    { useUnifiedTopology: true },
  );

  client.connect((err) => {
    assert.strictEqual(null, err);
    console.log('connected successfully to server');

    const db = client.db(dbName);

    return insertDocuments(db, () => closeConnection(client));
  });
}

// Close the connection
const closeConnection = (client) => client.close();

// Insert data to a document
const insertDocuments = (db, callback) => {
  const collection = db.collection('documents');
  collection.insertMany([
    { a: 1 }, { a: 2 }, { a: 3 },
  ], (err, result) => {
    assert.strictEqual(err, null);
    assert.strictEqual(3, result.result.n);
    assert.strictEqual(3, result.ops.length);
    console.log('Inserted 3 documents into the collection');
    callback(result);
  });
};

module.exports = dbConnect;
