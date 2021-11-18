import {
  User
} from "./user";

export const USERS: User[] = [{
    id: 0,
    firstname: "Stan",
    lastname: "Barkmeijer",
    email: "stanbarkmeijer@hotmail.com",
    password: "Test123",
    birthday: new Date(2001, 6, 16),
    admin: true
  },
  {
    id: 1,
    firstname: "Kyra",
    lastname: "Ooms",
    email: "kyra@carpediemshipping.com",
    password: "Test123",
    birthday: new Date(2002, 4, 21),
    admin: false
  },
  {
    id: 2,
    firstname: "Alice",
    lastname: "Ooms",
    email: "alice@carpediemshipping.com",
    password: "Test123",
    birthday: new Date(1981, 7, 5),
    admin: true
  },
  {
    id: 3,
    firstname: "Wilco",
    lastname: "Ooms",
    email: "wilco@carpediemshipping.com",
    password: "Test123",
    birthday: new Date(1978, 5, 14),
    admin: false
  }
];
