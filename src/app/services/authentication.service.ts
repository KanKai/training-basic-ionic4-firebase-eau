import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { RegisterInterface } from '../_models/register.interface';
import { AuthInterface } from '../_models/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() {}

  register(value: RegisterInterface) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(
          (res) => resolve(res),
          (err) => reject(err)
        );
    });
  }

  loginUser(value: AuthInterface) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(
          (res) => resolve(res),
          (err) => reject(err)
        );
    });
  }

  logoutUser() {
    return new Promise((resolve, reject) => {
      const getCurrentUser = firebase.auth().currentUser;
      if (getCurrentUser) {
        firebase.auth().signOut()
          .then(() => resolve())
          .catch((error) => reject());
      }
    });
  }

  userDetails() {
    return firebase.auth().currentUser;
  }

}
