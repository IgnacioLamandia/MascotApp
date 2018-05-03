import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { CategoriesPage } from '../pages/categories/categories';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { HttpModule } from '@angular/http';
import { PostProvider } from '../providers/posts/post';
import { UserProvider } from '../providers/user/user';
import { CreatePostPage } from '../pages/create-post/create-post';
import { PostInfoPage } from '../pages/post-info/post-info';
import { HttpClientModule } from '@angular/common/http';
import { GeoCoderProvider } from '../providers/geocoder/geocoder';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { AngularFireModule } from 'angularfire2';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseConfig } from '../config';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { AuthService } from '../services/auth.service';
import { Toast } from '@ionic-native/toast';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage,
    CategoriesPage,
    LoginPage,
    CreatePostPage,
    PostInfoPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig.fire),
    NgxErrorsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage,
    LoginPage,
    CategoriesPage,
    CreatePostPage,
    PostInfoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Toast,
    HttpClientModule,
    NativeGeocoder,
    AuthService,
    AngularFireAuth,
    Geolocation,
    GeoCoderProvider,
    PostProvider,
    UserProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera
  ]
})
export class AppModule {}
