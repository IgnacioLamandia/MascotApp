import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Post, Category } from '../../model/Post';
import { PostProvider } from '../../providers/posts/post';
import { HomePage } from '../home/home';

/**
 * Generated class for the CrearTareaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
	name:"createPostPage",
	segment:"create-post"
})
@Component({
  selector: 'page-create-post',
  templateUrl: 'create-post.html',
})

export class CreatePostPage {

	post = {description:'', image:'', latitude:'',longitude:'',address:'', category:{}};

	category = Object.keys(Category);
	categories = this.category.slice(this.category.length/2);

	postProvider : PostProvider;

  	constructor(private alrtCtrl:AlertController,public navCtrl: NavController,
			public navParams: NavParams, public restPosts: PostProvider) {
  		this.postProvider = restPosts;
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad CreatePostPage');
  	}

		getFileBlob(file) {
				var reader = new FileReader();
				return new Promise(function(resolve, reject){
						reader.onload = (function(theFile) {
								return function(e) {
									  console.log("blob");
										resolve(e.target.result);
								}
						})(file);
						reader.readAsDataURL(file);
				});
		}

		fileUpload(event) {
  		let fd = new FormData();
  		fd.append('file', event.srcElement.files[0]);
			var file = event.srcElement.files[0];
			let imgPromise = this.getFileBlob(file);

			imgPromise.then(blob => {
				console.log(blob);
				this.post.image = ''+blob;
			});
		}

  	savePost(){
			let newPost : Post = new Post(
					this.post.description, this.post.image,
					this.post.latitude, this.post.longitude,
					this.post.address, this.post.category
			);

			this.postProvider.newPost(newPost).subscribe(
    	() => {
            let confirmacion= this.alrtCtrl.create({
              title:'Confirmacion',
              message: 'Se publico correctamente',
              buttons:[{
                text:'Ok',
                handler:()=>{
                  this.navCtrl.push(HomePage);
                }
              }]
            });
            confirmacion.present();
				  },
      err => {
          console.log(<any>err);
      });
  	}
}
