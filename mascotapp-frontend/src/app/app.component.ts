import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CategoriesPage } from '../pages/categories/categories';
import { HomePage } from '../pages/home/home';
import { CreatePostPage } from '../pages/create-post/create-post';
import { HttpModule } from '@angular/http';
import { PostProvider } from '../providers/posts/post';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../services/auth.service';
import { Toast } from '@ionic-native/toast';
import { MyPostsPage } from '../pages/my-posts/my-posts';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;
  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    private auth: AuthService,
    private toast: Toast,
    private menu: MenuController,
    public splashScreen: SplashScreen) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home' },
      { title: 'Categorías', component: CategoriesPage, icon: 'options' }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  myPosts(){
    this.menu.close();
    this.nav.setRoot(MyPostsPage);
  }

  login() {
    this.menu.close();
    this.auth.signOut();
    this.nav.setRoot(LoginPage);
  }

  newPost() {
    this.menu.close();
    if(this.auth.authenticated) {
      this.nav.setRoot(CreatePostPage);
    }
    else {
      //this.showToast('Tienes que iniciar seción');
      this.nav.setRoot(LoginPage);
    }
  }

  logout() {
    this.menu.close();
		this.auth.signOut();
		this.nav.setRoot(HomePage);
  }

  home(){
    this.nav.push(HomePage);
  }

  showToast(message) {
    this.toast.show(message, '5000', 'center').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }
}
