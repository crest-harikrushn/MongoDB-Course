// to create number of int32 type in mongodb then use: NumberInt("21")

// This will insert age as Double => size: 35
// double has bigger range than integer but it stores precision, so it's not bigger than Long
db.persons.insertOne({ age: 29 });

// This will insert age as Integer (int32) => size: 31
db.persons.insertOne({ age: NumberInt("29") });

// This will insert age as IntegerLong (int64)
// has bigger range than integer(int32) and double as it stores full number only, not precision like double
db.persons.insertOne({ age: NumberLong("29") });

// * if we store this as normal numbers and when we subtract 0.3-0.1= 0.1999999999998 something like this, to avoid this use NumberDecimal
db.persons.insertOne({ a: 0.3, b: 0.1 });

// This will insert age as NumberDecimal(int128) - High Precision doubles  => size: 41
// has bigger range than Long, integer(int32) and double as it stores 128bit long number
db.persons.insertOne({ a: NumberDecimal("0.3"), b: NumberDecimal("0.1") });
