import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { User } from './user';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let user: User = {
    _id: "6",
    firstName: 'Test',
    lastName: 'Test',
    email: 'Test',
    password: 'Test',
    hashedPassword: "",
    birthday: new Date(),
    roles: [],
    orders: []
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(UserService);

    service.createUser(user);
  });

  afterEach(() => {
    service.deleteUser(user._id);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should retrieve all users", (done) => {
    let users: Observable<User[]> = service.getUsers();

    users
      .subscribe((u) => expect(u.length).toBe(5));

    done();
  });

  it("should retrieve 1 user", (done) => {
    let user: Observable<User> = service.getUser("6");

    user
      .subscribe((u) => {
        expect(typeof u).toBe("object");

        expect(u.firstName).toBe("Test");
        expect(u.lastName).toBe("Test");
        expect(u.email).toBe("Test");
      });

    done();
  });

  it("should not retrieve a user with non existant ID", (done) => {
    let user: Observable<User> = service.getUser("999999");

    user
      .subscribe((u) => {
        expect(u).toBeUndefined();
      });

    done();
  });

  // it("should delete 1 user", (done) => {
  //   service.getUsers().subscribe((r) => expect(r.length).toBe(5));

  //   service
  //     .deleteUser("1");

  //   service.getUsers().subscribe((r) => expect(r.length).toBe(4));

  //   done();
  // });

  it("should not delete user with non existant ID", (done) => {
    service.getUsers().subscribe((r) => expect(r.length).toBe(5));

    service
      .deleteUser("999999");

      service.getUsers().subscribe((r) => expect(r.length).toBe(5));

    done();
  });
});
