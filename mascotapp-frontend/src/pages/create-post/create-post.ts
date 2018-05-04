import { Component, ViewChild, NgZone, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Post, Category } from '../../model/Post';
import { PostProvider } from '../../providers/posts/post';
import { HomePage } from '../home/home';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { GeoCoderProvider } from '../../providers/geocoder/geocoder';
import { Camera,CameraOptions } from '@ionic-native/camera';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
	formPost : FormGroup;
	postData:any[] = [];

  	constructor(private alrtCtrl:AlertController, public navCtrl: NavController,
			public navParams: NavParams, public restPosts: PostProvider, private camera: Camera,
			private geolocation: Geolocation, private geoCoder: GeoCoderProvider, private fb: FormBuilder, private alertCtrl:AlertController) {
			this.postProvider = restPosts;
			
			this.formPost = this.fb.group({
				title:[this.postData['title'],[Validators.required,Validators.minLength(4),Validators.maxLength(50)]],
				description:[this.postData['description'],[Validators.required,Validators.minLength(5),Validators.maxLength(250)]],
				image:[this.post['image'],[Validators.required]],
				address:[this.post['address'],[Validators.required]],
				category:[this.postData['category'],[Validators.required]],
			})
  	}

		@ViewChild('addressInput', { read: ElementRef })
		public searchElementRef;

		@ViewChild('fileInp', { read: ElementRef })
		public fileInput;
		ngAfterViewInit(){
			const input = this.searchElementRef.nativeElement.getElementsByTagName('input')[0];
			let component = this;
			let options = {
	      types: [],
	      componentRestrictions: {country: "ar"}
	    };
      let autocomplete = new google.maps.places.Autocomplete(input, options);
			autocomplete.addListener('place_changed', function() {
				component.post.address = autocomplete.getPlace().formatted_address;
				component.post.latitude = autocomplete.getPlace().geometry.viewport.f.b;
				component.post.longitude = autocomplete.getPlace().geometry.viewport.b.b
			}, false);
		}

		uploadImage() {
				console.log('uploadImage'),
				console.log(this.fileInput),
				this.fileInput.nativeElement.click();
		}

		changeListener($event) : void {
			console.log('changeListener');
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

		newPost(){
			this.post.title = this.postData['title'];
			this.post.description = this.postData['description'];
			//this.post.image = this.postData['image'];
			//this.post.address = this.postData['address'];  // los comentados se setean directo a post
			this.post.category = this.postData['category'];
		}

  	savePost(){
			this.newPost();
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
						var number = result.results[0].address_components[0].long_name;
						var location = result.results[0].address_components[2].long_name;
						var city = result.results[0].address_components[3].long_name;
						this.post.address = street +' '+number+', '+ location +', '+ city
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

	takeImage(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {

     let newImage = 'data:image/jpeg;base64,' + imageData;
     this.post.image = newImage;
    }, (err) => {
      console.log(err);
    });
  }

}
