// import { findAllDocuments } from '../database/methods';

const readAllDocuments = ({ schemaName }) => {
  // return findAllDocuments({});
  const message = { ok: true };
  return response.json(message);
};

export default readAllDocuments;
