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
import { CreatePostPage } from '../pages/create-post/create-post';
import { PostInfoPage } from '../pages/post-info/post-info';
import { HttpClientModule } from '@angular/common/http';
import { GeoCoderProvider } from '../providers/geocoder/geocoder';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CategoriesPage,
    CreatePostPage,
    PostInfoPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CategoriesPage,
    CreatePostPage,
    PostInfoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClientModule,
    NativeGeocoder,
    Geolocation,
    GeoCoderProvider,
    PostProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera
  ]
})
export class AppModule {}
