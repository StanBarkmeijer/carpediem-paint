import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { User } from './user';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
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
    let user: Observable<User> = service.getUser(0);

    user
      .subscribe((u) => {
        expect(typeof u).toBe("object");

        expect(u.firstname).toBe("Stan");
        expect(u.lastname).toBe("Barkmeijer");
        expect(u.email).toBe("stanbarkmeijer@hotmail.com");
      });

    done();
  });

  it("should not retrieve a user with non existant ID", (done) => {
    let user: Observable<User> = service.getUser(999999);

    user
      .subscribe((u) => {
        expect(u).toBeUndefined();
      });

    done();
  });

  it("should delete 1 user", (done) => {
    expect(service.users.length).toBe(5);

    service
      .deleteUser(1);

    expect(service.users.length).toBe(4);

    done();
  });

  it("should not delete user with non existant ID", (done) => {
    expect(service.users.length).toBe(5);

    service
      .deleteUser(999999);

    expect(service.users.length).toBe(5);

    done();
  });

  it("should add user", (done) => {
    expect(service.users.length).toBe(5);

    const user: User = {
      id: 6,
      firstname: 'Test',
      lastname: 'Test',
      email: 'Test',
      password: 'Test',
      birthday: new Date(),
      admin: false
    }

    service
      .createUser(user);

    expect(service.users.length).toBe(6);
    
    done();
  });
});
