import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpModule } from '@angular/http';
import { PostProvider } from '../providers/posts/post';
import { CategoriesPage } from '../pages/categories/categories';
import { CreatePostPage } from '../pages/create-post/create-post';
import { PostInfoPage } from '../pages/post-info/post-info';
import { HttpClientModule } from '@angular/common/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

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
    PostProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
