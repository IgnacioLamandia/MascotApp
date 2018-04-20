import { Component, ViewChild, NgZone, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Post, Category } from '../../model/Post';
import { PostProvider } from '../../providers/posts/post';
import { HomePage } from '../home/home';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { GeoCoderProvider } from '../../providers/geocoder/geocoder';

declare var google;
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
	providers:[ Geolocation, GeoCoderProvider,PostProvider]
})

export class CreatePostPage {
	post = {title:'', description:'', image:'', latitude:0, longitude:0, address:'', category: Category.PERDIDO};
	category = Object.keys(Category);
	categories = this.category.slice(this.category.length/2);
	postProvider : PostProvider;

  	constructor(private alrtCtrl:AlertController, public navCtrl: NavController,
			public navParams: NavParams, public restPosts: PostProvider,
			private geolocation: Geolocation, private geoCoder: GeoCoderProvider) {
  		this.postProvider = restPosts;
  	}

		@ViewChild('addressInput', { read: ElementRef })
		public searchElementRef;

		ionViewDidLoad() {
    	console.log('ionViewDidLoad CreatePostPage');
  	}

		ngAfterViewInit(){
			const nativeHomeInputBox = this.searchElementRef.nativeElement.getElementsByTagName('input')[0];
			let options = {
	      types: [],
	      componentRestrictions: {country: "ar"}
	    };
      let autocomplete1 = new google.maps.places.Autocomplete(nativeHomeInputBox, options);
			google.maps.event.addListener(autocomplete1, 'place_changed', function() {
	      console.log("FROM CHANGED!" + this.post);
			});
			console.log( this.post.address);
		}

		changeListener($event) : void {
  		this.readThis($event.target);
		}

		readThis(inputValue: any): void {
		  var file:File = inputValue.files[0];
		  var myReader:FileReader = new FileReader();
		  myReader.onloadend = (e) => {
				var solution = myReader.result.split("base64,");
		    this.post.image = solution[1];
		  }
		  myReader.readAsDataURL(file);
		}

  	savePost(){
		  this.restPosts.savePost(this.post).then((result) => {
				this.returnHome();
		  }, (err) => {
		    console.log(err);
		  });
		}

		getPosition() {
			this.geolocation.getCurrentPosition().then(response => {
				var position: Geoposition = response;
				this.post.latitude = position.coords.latitude;
				this.post.longitude = position.coords.longitude;
				this.getAddress();
			})
			.catch(error =>{
				console.log(error);
			})
		}

		getAddress(){
			var latitude = this.post.latitude;
			var longitude = this.post.longitude;
			this.geoCoder.getAddressFromPosition(latitude ,longitude).subscribe(
				result => {
					if(result.code != 200){
						var street = result.results[0].address_components[1].long_name;
						var location = result.results[0].address_components[2].long_name;
						var city = result.results[0].address_components[3].long_name;
						this.post.address = street +', '+ location +', '+ city
					}else {
						console.log(result);
					}
				},
				error => {
					console.log(<any>error);
				}
			);;
		}

		getActualPosition() {
			this.getPosition();
		}

		returnHome() {
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
