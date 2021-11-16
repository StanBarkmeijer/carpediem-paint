import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users = [
    { name: "Stan", password: "Test123", birthday: "16-07-2001"},
    { name: "Wasd", password: "Test123", birthday: "16-07-2001"},
    { name: "ASDd", password: "Test123", birthday: "16-07-2001"},
    { name: "asdff", password: "Test123", birthday: "16-07-2001"}
  ];

  constructor() { }

  ngOnInit(): void {

  }

}
