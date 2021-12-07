import {
  User
} from "./user";

export const USERS: User[] = [{
    _id: "0",
    firstName: "Stan",
    lastName: "Barkmeijer",
    email: "stanbarkmeijer@hotmail.com",
    password: "Test123",
    hashedPassword: "",
    birthday: new Date(2001, 6, 16),
    roles: [],
    orders: []
  },
  {
    _id: "1",
    firstName: "Kyra",
    lastName: "Ooms",
    email: "kyra@carpediemshipping.com",
    password: "Test123",
    hashedPassword: "",
    birthday: new Date(2002, 4, 21),
    roles: [],
    orders: []
  },
  {
    _id: "2",
    firstName: "Alice",
    lastName: "Ooms",
    email: "alice@carpediemshipping.com",
    password: "Test123",
    hashedPassword: "",
    birthday: new Date(1981, 7, 5),
    roles: [],
    orders: []
  },
  {
    _id: "3",
    firstName: "Wilco",
    lastName: "Ooms",
    email: "wilco@carpediemshipping.com",
    password: "Test123",
    hashedPassword: "",
    birthday: new Date(1978, 5, 14),
    roles: [],
    orders: []
  },
  {
    _id: "4",
    firstName: "Tester",
    lastName: "Nadmin",
    email: "test@carpediem-paint.herokuapp.com",
    password: "Testaccount",
    hashedPassword: "",
    birthday: new Date(),
    roles: [],
    orders: []
  }
];
