import assert from 'assert';

const insertDocuments = ({ schemaName, documentData }) => {
  const collection = global.mongodbInstance.collection(schemaName);
  collection.insertMany(documentData,
    (err, result) => {
      assert.strictEqual(err, null);
      return result;
    });
};

const findAllDocuments = ({ schemaName }) => {
  const collection = global.mongodbInstance.collection(schemaName);
  collection.find({}).toArray((err, docs) => {
    assert.strictEqual(err, null);
    return docs;
  });
};

const findDocumentsByFilter = ({ schemaName, filter }) => {
  const collection = global.mongodbInstance.collection(schemaName);
  collection.find(filter).toArray((err, docs) => {
    assert.strictEqual(err, null);
    return docs;
  });
};

const updateDocument = ({ schemaName, filter, documentData }) => {
  const collection = global.mongodbInstance.collection(schemaName);
  collection.updateOne(
    filter,
    { $set: documentData },
    (err, result) => {
      assert.strictEqual(err, null);
      return result;
    },
  );
};

const removeDocument = ({ schemaName, filter }) => {
  const collection = global.mongodbInstance.collection(schemaName);
  collection.deleteOne(
    filter,
    (err, result) => {
      assert.strictEqual(err, null);
      console.log(result);
      return true;
    },
  );
};

module.exports = {
  insertDocuments, findAllDocuments, findDocumentsByFilter, updateDocument, removeDocument,
};
