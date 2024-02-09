// create User
db.createUser({
  user: "username",
  pwd: "password",
  roles: ["userAdminAnyDatabase"],
});

// authenticate user | login user
db.auth("username", "password");

//?  Built-in Roles
// * Databse User: read | readWrite
// * Databse Admin: dbAdmin | userAdmin | dbOwner
// * All Database Roles: readAnyDatabase | readWriteAnyDatabase | userAdminAnyDatabase | dbAdminAnyDatabase
// * Cluster Admin:
// * Backup Restore:
// * Super User:

// mongo -u username -p pwd --authenticationDatabase admin

// Helpful Articles/ Docs:

// Official "Encryption at Rest" Docs: https://docs.mongodb.com/manual/core/security-encryption-at-rest/

// Official Security Checklist: https://docs.mongodb.com/manual/administration/security-checklist/

// What is SSL/ TLS? => https://www.acunetix.com/blog/articles/tls-security-what-is-tls-ssl-part-1/

// Official MongoDB SSL Setup Docs: https://docs.mongodb.com/manual/tutorial/configure-ssl/

// Official MongoDB Users & Auth Docs: https://docs.mongodb.com/manual/core/authentication/

// Official Built-in Roles Docs: https://docs.mongodb.com/manual/core/security-built-in-roles/

// Official Custom Roles Docs: https://docs.mongodb.com/manual/core/security-user-defined-roles/
