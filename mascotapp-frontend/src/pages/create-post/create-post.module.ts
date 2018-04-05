import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatePostPage } from './create-post';
import { PostProvider } from '../../providers/posts/post';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    CreatePostPage
  ],
  imports: [
    IonicPageModule.forChild(CreatePostPage),
    HttpClientModule
  ],
  providers: [
  	PostProvider
  ]
})
export class CreatePostPageModule {}
