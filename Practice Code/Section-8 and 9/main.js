// ! UPDATE RELATED
// * $inc operator
// updateOne(filter, { $inc: { fieldName: increment_by } });

// $min and $max => it'll update value of field with specified value, if specified value is less than fieldValue for min
//                     and if specified value is greater than fieldValue

// we have age of 38 in db, then it'll update to 35. If we had age value 32 in db then it'll remain same
updateOne(filter, { $min: { age: 35 } });
updateOne(filter, { $max: { age: 35 } });

// $mul: => we have age of 38 in db then it'll be 38 * 1.1 which is 41.8 but it'll add extra precesions after decimal: e.g: 41.800000412
updateOne(filter, { $mul: { age: 1.1 } });

// * $unset operator: => allows to delete | remove | unset the existing field
updateMany(filter, { $unset: { phone: "" } });

// * $rename operator => allows to rename the field name
// If field is not found in any record, it'll not add new field to that record
updateMany({}, { $rename: { existingfieldName: "newFieldName" } });
updateMany({}, { $rename: { age: "totalAge" } });

// * upsert option
//    - If record doesn't exists then it'll add record, OTHERWISE update existing record.
//    - It'll also add filter data in new record, if record doesn't exists.
updateOne(filter, update, { upsert: true });
updateOne(filter, { $set: { age: 39, isSporty: true } }, { upsert: true });
