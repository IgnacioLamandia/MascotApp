import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;
import { UserProvider } from '../providers/user/user';

@Injectable()
export class AuthService {
	public user: firebase.User;
	userToSave = {name:'', email:'', external_id:'', posts: null};
	constructor(public afAuth: AngularFireAuth,
		private userProvider: UserProvider) {
		afAuth.authState.subscribe(user => {
			this.user = user;
		});
	}

	signInWithEmail(credentials) {
		console.log('Sign in with email');
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
			 credentials.password);
	}

	signUp(credentials) {
		let provider = this;
		return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email,credentials.password)
			.then(function(user) {
				provider.saveUser(user);
    	});
	}


	get authenticated(): boolean {
		return this.user !== null;
	}

	getEmail() {
		return this.user && this.user.email;
	}

	getUser() {
		return this.user && this.user;
	}

	signOut(): Promise<void> {
		return this.afAuth.auth.signOut();
	}

	signInWithGoogle() {
		return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
	}

	private oauthSignIn(provider: AuthProvider) {
		if (!(<any>window).cordova) {
			return this.afAuth.auth.signInWithPopup(provider);
		} else {
			return this.afAuth.auth.signInWithRedirect(provider)
			.then(() => {
				return this.afAuth.auth.getRedirectResult().then( result => {
					// This gives you a Google Access Token.
					// You can use it to access the Google API.
					let token = result.credential.accessToken;
					// The signed-in user info.
					console.log('Token: '+token);
					let user = result.user;
					console.log('user: '+user.name);
				}).catch(function(error) {
					// Handle Errors here.
					alert(error.message);
				});
			});
		}
	}

	saveUser(user) {
    console.log(user);
    if(user.displayName) {
      this.userToSave.name = user.displayName;
    }
    else {
      this.userToSave.name = user.email;
    }
    this.userToSave.email = user.email;
    this.userToSave.external_id = user.uid;
    this.userProvider.saveUser(this.userToSave).then((result) => {
      console.log('User saved')
    }, (err) => {
      console.log(err);
    });
  }
}
