// Example user controller
exports.createUser = (req, res) => {
  const { name, email } = req.body;
  // Logic to create a user in DynamoDB (or any other database)
  res.json({ message: "User created successfully!" });
};

exports.getUser = (req, res) => {
  const { id } = req.params;
  // Logic to get a user from DynamoDB
  res.json({ message: `User with ID: ${id} fetched successfully!` });
};
