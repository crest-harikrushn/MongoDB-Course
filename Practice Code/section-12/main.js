// ! Aggregate | Aggregation Framework

// Simple aggreate which does same as find()
db.persons.aggregate([
  {
    $match: {
      gender: "female",
    },
  },
]);

// Adding Grouping (GROUP BY) Clause
db.persons.aggregate([
  {
    $match: {
      gender: "female",
    },
  },
  { $group: { _id: { state: "$location.state" }, totalPersons: { $sum: 1 } } },
]);

// Adding Sort Clause
db.persons.aggregate([
  {
    $match: {
      gender: "female",
    },
  },
  { $group: { _id: { state: "$location.state" }, totalPersons: { $sum: 1 } } },
  { $sort: { totalPersons: -1 } },
]);

//* $out aggregation
// used to store aggregation result into new collection  - at last stage of pipeline
