// ? 1) upsert data
db.sports.updateOne(
  { title: "Cricket" },
  { $set: { requiresTeam: true } },
  { upsert: true }
);

db.sports.updateOne(
  { title: "Table Tennis" },
  { $set: { requiresTeam: false } },
  { upsert: true }
);

db.sports.updateOne(
  { title: "Volley Ball" },
  { $set: { requiresTeam: true } },
  { upsert: true }
);

// ? 2) update records with new field
db.sports.updateMany(
  { requiresTeam: true },
  { $set: { min_player_required: 11 } }
);

// ? 2) update records with new field: increase newfield by 10
db.sports.updateMany(
  { requiresTeam: true },
  { $inc: { min_player_required: 10 } }
);

// * updating matched array element
/// find matching array element and .$ will update selected array element with specified value, and .$.newfield will add new Field
/// this will only update first Match in array element, it'll not update all array element with matching condition in a document
// /? e.g: hobbies contains array of objects, but it'll update first matching array element in hobbies of each records
updateMany(
  { hobbies: { $elemMatch: { title: "Sports", frequency: { $gte: 3 } } } },
  { $set: { "hobbies.$.highFrequency": true } }
);

// * update all element in array using .$[].fieldName
updateMany(
  { hobbies: { $elemMatch: { title: "Sports", frequency: { $gte: 3 } } } },
  { $set: { "hobbies.$[].highFrequency": true } }
);

// * find specific data and update that
// can define some conditions by which you want to filter elements and these conditions can even differ from filter coditions

// this will look for each hobby element with frequency greater than 2 (arrayFilters condition)
updateMany(
  { "hobbies.frequency": { $gt: 2 } },
  { $set: { "hobbies.$[el].goodFrequency": true } },
  { arrayFilters: [{ "el.frequency": { $gt: 2 } }] }
);

// * Adding Element to Array:
// * $push method or operator
// single element
updateOne(
  { name: "maria" },
  { $push: { hobbies: { title: "Sports", isSporty: true } } }
);

// multiple element
// using $each: []
updateOne(
  { name: "maria" },
  {
    $push: {
      hobbies: {
        $each: [
          { title: "Good Wine", frequency: 2 },
          { title: "Reading", frequency: 1 },
        ],
        // can also sort data
        $sort: {
          frequency: -1,
        },
        // can also specify $slice to add only specified elements
        // $slice: 1,
      },
    },
  }
);

// * removing elements from array
// * $pull: {field: {condition}} => how or what you want to remove
updateOne(
  { name: "Chris" },
  { $pull: { hobbies: { title: { $in: ["Cycling", "GYM"] } } } }
);

updateOne({ name: "Chris" }, { $pull: { hobbies: { title: "Cycling" } } });

// * $pop operator:
// $pop: {field: 1 | -1}
// 1: last element
// -1: first element
updateOne({ name: "Chris" }, { $pop: { hobbies: 1 } });

// * $addToSet operator
// to add unique value only. if value specified is already exists it'll not add to databse
updateOne({}, { $addToSet: { field: value } });
updateOne({}, { $addToSet: { hobbies: { tittle: "", frequency: 0 } } });

// ! DELETE
// ? Returns Either true: if deleted or exists | false: if not deleted or exists
db.collectionName.drop();
db.dropDatabase();
