import { Injectable } from '@angular/core';
import { RegisterInterface } from '../_models/register.interface';
import { AuthInterface } from '../_models/auth.interface';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userCollection: AngularFirestoreCollection<any>;
  constructor(
    private afs: AngularFirestore
  ) {
    this.userCollection = this.afs.collection<any>('userProfile');
  }

  register(value: RegisterInterface): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(
          (res) => resolve(res),
          (err) => reject(err)
        );
    });
  }

  updateProfile(data: any): Promise<DocumentReference> {
    return this.userCollection.add(data);
  }

  loginUser(value: AuthInterface): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(
          (res) => resolve(res),
          (err) => reject(err)
        );
    });
  }

  logoutUser(): Promise<any> {
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
