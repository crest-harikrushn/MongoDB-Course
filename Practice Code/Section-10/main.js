// ! MongoDB has threshold of 32 megabytes for sorting

// to check stats and execution process
db.contacts.explain().find({ "dob.age": { $gt: 60 } });
db.contacts.explain("executionStats").find({ "dob.age": { $gt: 60 } });

// create index
// Params: SORT ORDER (1: AESC | -1: DESC)
db.contacts.createIndex({ "dob.age": 1 });

// ? Indexes Behind the Scenes:
// * What does createIndex() do in detail?

// Whilst we can't really see the index, you can think of the index as a simple list of values + pointers to the original document.

// Something like this (for the "age" field):

// (29, "address in memory/ collection a1")

// (30, "address in memory/ collection a2")

// (33, "address in memory/ collection a3")

// The documents in the collection would be at the "addresses" a1, a2 and a3. The order does not have to match the order in the index (and most likely, it indeed won't).

// The important thing is that the index items are ordered (ascending or descending - depending on how you created the index). createIndex({age: 1}) creates an index with ascending sorting, createIndex({age: -1}) creates one with descending sorting.

// MongoDB is now able to quickly find a fitting document when you filter for its age as it has a sorted list. Sorted lists are way quicker to search because you can skip entire ranges (and don't have to look at every single document).

// Additionally, sorting (via sort(...)) will also be sped up because you already have a sorted list. Of course this is only true when sorting for the age.

// ! drop indexes | delete index
db.contacts.dropIndex({ "dob.age": 1 });

// ! Types of Indexes
//? 1) Compound Index : multiple fields in key
// Oder is left to right -> for index scans.
// say, you have to search for age then it'll use index but if you search for gender only then it'll use collection scan instead of index scan
// sorted according to first fieldName

// {partialFilterExpression} can be added as second arguments to add partial filters
//*  e.g.: 33, "male" -> address of storage

db.contacts.createIndex({ "dob.age": 1, gender: 1 });
db.contacts.find({ "dob.age": 20 }); // uses INDEX SCAN
db.contacts.find({ gender: "male" }); // uses COLLECTION SCAN

// SORTING DATA ACCORDING TO INDEX SORTS
// ! MongoDB has threshold of 32 megabytes for sorting
db.contacts.find({ "dob.age": 35 }).sort({ gender: 1 }); // uses SORTING OF INDEX

//? 2) Default Index:
// on "_id" field always
db.contacts.getIndexes();

//? 3) Unique index
// you can configure index settings such as only unique values are allowed
// it avoids duplicate data
db.contacts.createIndex({ email: 1 }, { unique: true });

// * Partial Filters
//? 3) Partial INDEX
// HAS SMALLER INDEX SIZE THAN COMPOUND INDEX
// It'll create index and stores ages which has gender "male"
db.contacts.createIndex(
  { "dob.age": 1 },
  { partialFilterExpression: { gender: "male" } }
);

// stores ages only greater than 60
db.contacts.createIndex(
  { "dob.age": 1 },
  { partialFilterExpression: { "dob.age": { $gt: 60 } } }
);

// now if we use this below query then it'll use COLLECTION SCAN because we are not quering what we've specified in partialIndex
db.contacts.find({ age: { $gt: 60 } });

// if we use this below query then it'll perform INDEX SCAN
db.contacts.find({ age: { $gt: 60 }, gender: "male" });

// Partial Index with Compound Index
// only unique emails are allowed to insert, if not specified "email" then fails
db.users.createIndex({ email: 1 }, { unique: true });

// only add elements into my index where email field exists
// inserting data should have "email" key
db.users.createIndex(
  { email: 1 },
  { unique: true, partialFilterExpression: { email: { $exists: true } } }
);

//? 4) Time-To-Live Index (TTL-Index)
// only works with date field
// does not work on compound index
// deletes data it selft after given timespan
// even before creation of index, inserted data will be removed, once new documents is added to collection
db.sessions.createIndex({ createdAt: 1 }, { expiresAfterSeconds: 10 });

//? 5) Multi-Key Indexes
// they are stored differently
// when you have query in array which has multiple keys | records
db.contacts.createIndex({ hobbies: 1 });

// * It pulls out elements of the array for addresses as single element in the array happens to be document, so that document  is what mongodb pulled out and what  mongodb then stored in the index registry

// ! No more than one multi key index (more than one columns which has array) is used along with compound index
//* db.contacts.createIndex({name: 1, hobbies: 1});  // allows
//* db.contacts.createIndex({addresses: 1, hobbies: 1});  // *** doest not allow, because both are arrays

// when you have array of objects and you're quering on that object's key then it'll not work. it'll run COLLECTION SCAN instead of INDEX SCAN
db.contacts.createIndex({ address: 1 });

// uses COLLECTION SCAN
db.contacts.find({ "address.street": "Main Street" });

// uses INDEX SCAN
db.contacts.find({ address: { street: "Main Street" } });

//? 6) Text Index (which is type of multi-key index)
// * can only have one text index per collection
// turns text into array of single words
// It also removes stop or join words, such as: [a, an, the, and, or], etc
// eg. text: this product is must buy for all fans of morden fiction!
// Text index: [
//     "product",
//     "buy",
//     "must",
//     "morden"
// ]

// for fixed description of exacts same text not different words
db.products.createIndex({ description: 1 | -1 });

// creates text index and split string into words
db.products.createIndex({ description: "text" });

//? how to apply in querying?
// documents with "awesome" word
db.products.find({ $text: { $search: "awesome" } });

// documents with "book" word
db.products.find({ $text: { $search: "book" } }); //dcouments with  "book" words in it.

// documents with any "red" and "book" word
db.products.find({ $text: { $search: "red book" } }); //dcouments with "red" and "book" words in it.

// documents with "red book" as whole text
// pass whole text inside "". e.g: $text: {$search: " \"awesome book\" "}
db.products.find({ $text: { $search: "red book" } }); //dcouments with "awesome book" text in it.

// MongoDB manages textScore to show records in sorting according to score.
// It stores under $meta data of "textScore" of score key
db.products.find(
  { $text: { $search: "awesome T-shirt" } },
  { score: { $meta: "textScore" } }
); //dcouments with "awesome book" text in it.

// manually sort according to score
db.products
  .find(
    { $text: { $search: "awesome T-shirt" } },
    { score: { $meta: "textScore" } }
  )
  .sort({ score: { $meta: "textScore" } }); //dcouments with "awesome book" text in it.

db.products.dropIndex("index_name");

//?   combined text index
db.products.createIndex({ title: "text", description: "text" });

//   exclude words: use "-" (minus) sign before word
db.products.find({ $text: { $search: "red -book" } }); //dcouments with "awesome book" text in it.

// create index in foreground, which does not allows CRUD operations while creating index, it'll pause execution of query until index is created
db.products.createIndex({ title: "text", description: "text" });

// create index in background, which allows CRUD operations while creating index
// default always: false, which means always creates foreground index
db.products.createIndex(
  { title: "text", description: "text" },
  { background: true }
);
