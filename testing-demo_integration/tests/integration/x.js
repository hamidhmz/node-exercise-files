//POST /api/returns {customerId,movieId}
// Return 402 if client is not logged in
// Return 400 if customerId is not provided
// Return 400 if movieId is not provided
// Return 404 if no rental found for this customer/movie
// Return 400 if rental already processed
// Return 200 if valid request
// set the return date 
// calculate the rental fee
// Increase the stock
// Return the rental