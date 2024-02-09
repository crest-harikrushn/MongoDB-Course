// Instructor's
// db.persons
//   .aggregate([
//     { $match: { "dob.age": { $gt: 50 } } },
//     {
//       $group: {
//         _id: { gender: "$gender" },
//         numPersons: { $sum: 1 },
//         avgAge: { $avg: "$dob.age" },
//       },
//     },
//     { $sort: { numPersons: -1 } },
//   ])
//   .pretty();

// Working
db.persons.aggregate([
  { $match: { "dob.age": { $gt: 50 } } },
  {
    $group: {
      _id: { sex: "$gender" },
      totalCount: { $sum: 1 },
      avgAge: { $avg: "$dob.age" },
    },
  },
  { $sort: { totalCount: -1 } },
]);
