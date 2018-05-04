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

@IonicPage()
@Component({
  selector: 'page-edit-post',
  templateUrl: 'edit-post.html',
  providers:[ Geolocation, GeoCoderProvider,PostProvider]
})
export class EditPostPage {

  id : number;
  post;
	category = Object.keys(Category);
	categories = this.category.slice(this.category.length/2);
	postProvider : PostProvider;
	formPost : FormGroup;

  constructor(private alrtCtrl:AlertController, public navCtrl: NavController,
    public navParams: NavParams, public restPosts: PostProvider, private camera: Camera,
    private geolocation: Geolocation, private geoCoder: GeoCoderProvider, private fb: FormBuilder, private alertCtrl:AlertController) {
    this.postProvider = restPosts;
    this.id = this.navParams.get('id');
    this.post = this.cargarPost(this.id);
    
    this.formPost = this.fb.group({
      title:[this.post['title'],[Validators.required,Validators.minLength(4),Validators.maxLength(50)]],
      description:[this.post['description'],[Validators.required,Validators.minLength(5),Validators.maxLength(250)]],
      image:[this.post['image'],[Validators.required]],
      address:[this.post['address'],[Validators.required]],
      category:[this.post['category'],[Validators.required]],
    })
  }

  @ViewChild('addressInput', { read: ElementRef })
  public searchElementRef;

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPostPage');
    this.postProvider.getPostById(this.id).subscribe(post => {
      this.post = post;
    })
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

  cargarPost(id:number) {
    return this.postProvider.getPostById(id); 
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

  updatePost(){
    this.postProvider.updatePost(this.post);
  }


}
