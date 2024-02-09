// GeoJSON is data type which stores location data
// GeoJSON type needs to have these two key in object: {type: "", coordinates: [10, 12]}

db.places.insertOne({
  name: "Science Academy",
  location: { type: "Point", coordinates: [40, 5] },
});

// * Geo Query
db.places.find({
  location: { $near: { $geometry: { type: "Point", coordinates: [40, 12] } } },
});

// to run this query, needs GeoSpatial Index to Track the Distance
db.places.createIndex({ location: "2dsphere" });

// provide max and min distances to find and cap the distance
db.places.find({
  location: {
    $near: {
      $geometry: { type: "Point", coordinates: [40, 12] },
      $maxDistance: 100,
      $minDistance: 10,
    },
  },
});
