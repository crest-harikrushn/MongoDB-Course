// ! COVERED QUERY

// Indexes are cached for faster execution
// but it has threshold which is write(1000) records
// after that cached index (winning plan) will be removed

// ? when it'll be removed ?
// * 1 ) write Threshold(1000)
// * 2 ) Index rebuild
// * 3 ) Other Index Added or Removed
// * 4 ) MongoDB Server Restarted
