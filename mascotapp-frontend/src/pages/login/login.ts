import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthService } from '../../services/auth.service';
import { SignupPage } from '../signup/signup';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	loginForm: FormGroup;
	loginError: string;
  user = {name:'', email:'', external_id:'', posts: null};

	constructor(
    private userProvider: UserProvider,
		private navCtrl: NavController,
		private auth: AuthService,
		fb: FormBuilder
	) {
		this.loginForm = fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
		});
	}

  login() {
		let data = this.loginForm.value;
		if (!data.email) {
			return;
		}

		let credentials = {
			email: data.email,
			password: data.password
		};

		this.auth.signInWithEmail(credentials)
			.then(
				(user) => this.getUser(user),
				error => this.loginError = error.message
			);
  }

  signup(){
    this.navCtrl.push(SignupPage);
  }

  loginWithGoogle() {
    this.auth.signInWithGoogle()
      .then(
        (user) => this.getUserFromGoogle(user),
        error => console.log(error.message)
      );
  }

  getUserFromGoogle(user) {
      this.getUser(user.user);
  }

  getUser(user) {
    console.log(user);
    if(user.displayName) {
      this.user.name = user.displayName;
    }
    else {
      this.user.name = user.email;
    }
    this.user.email = user.email;
    this.user.external_id = user.uid;
    this.userProvider.saveUser(this.user).then((result) => {
      this.navCtrl.setRoot(HomePage);
    }, (err) => {
      console.log(err);
    });
  }
}
