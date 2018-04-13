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
	post = {description:'', image:'', latitude:0,longitude:0,address:'', category: Category.PERDIDO};
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

		changeListener($event) : void {
  		this.readThis($event.target);
		}

		readThis(inputValue: any): void {
		  var file:File = inputValue.files[0];
		  var myReader:FileReader = new FileReader();

		  myReader.onloadend = (e) => {
				var solution = myReader.result.split("base64,");
				console.log(solution);
		    this.post.image = solution[1];
		  }
		  myReader.readAsDataURL(file);
		}

  	savePost(){

			let newPost : Post = new Post(
					this.post.description, this.post.image,
					this.post.address, this.post.category
			);
		  this.restPosts.savePost(newPost).then((result) => {
				this.returnToHome();
		  }, (err) => {
		    console.log(err);
		  });
		}

		returnToHome() {
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
		}
}
