import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456"),
    isAdmin: true,
  },
  {
    name: "Avinash Shukla",
    email: "avinash@example.com",
    password: bcrypt.hashSync("123456"),
  },
  {
    name: "Akash Lilhare",
    email: "akash@example.com",
    password: bcrypt.hashSync("123456"),
  },
];

export default users;
