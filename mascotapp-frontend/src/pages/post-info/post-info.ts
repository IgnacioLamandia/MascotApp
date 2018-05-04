import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Post } from '../../model/Post';
import { PostProvider } from '../../providers/posts/post';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditPostPage } from '../edit-post/edit-post';

declare var google;

@IonicPage()
@Component({
  selector: 'page-post-info',
  templateUrl: 'post-info.html',
  providers:[ PostProvider]
})
export class PostInfoPage {

  public imgWidth: any;
	public imgHeight:any;
  public map:any;
	public post:Post;
  public comment = {text:'', name:'', email:'', id:0};
  public comments : any = [];
  postProvider : PostProvider;
  formularioComment : FormGroup;
  commentData:any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public restPosts: PostProvider,private fb: FormBuilder, private alertCtrl:AlertController) {
    this.imgHeight="300";
    this.imgWidth="300";
  	this.post = navParams.get("post");
    this.comments = this.post.comments
    this.postProvider = restPosts;

    this.formularioComment = this.fb.group({
      text:[this.commentData['text'],[Validators.required,Validators.minLength(5),Validators.maxLength(200)]],
      name:[this.commentData['name'],[Validators.required,Validators.minLength(4),Validators.maxLength(50)]],
      email:[this.commentData['email'],[Validators.required,Validators.email]],
    })
  }

  ionViewDidLoad(){
    this.loadMap();
  }

  loadMap(){
    let latitude = this.post.latitude;
    let longitude = this.post.longitude;
    // create a new map by passing HTMLElement
    let mapEle: HTMLElement = document.getElementById('map');

    // create LatLng object
    let myLatLng = {lat: latitude, lng: longitude};

    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 15
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      let marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: 'Hello World!'
      });
      mapEle.classList.add('show-map');
    });
  }

  isMyPost() {
    return true; //ver logica de como definir cuando es mi post
  }

  isEmptyComments() {
    return this.comments.length > 0;
  }

  newComment(){
    this.comment.text = this.commentData['text'];
    this.comment.name = this.commentData['name'];
    this.comment.email = this.commentData['email'];
  }

  saveComment(){
    this.newComment();
    this.post.comments.push(this.comment);
        //conectarse con el provider
        this.postProvider.addComment(this.post.id, this.comment);

    this.comment = {text:'', name:'', email:'', id:0};
    this.formularioComment.reset()
    this.commentData = [];

}

  /**
   * evento que se ejecuta al enviar la informacion, este solo cumple la funcion de mostrar un mensaje de informacion,
   * resetea el formulario y sus validaciones y limpia el parametro datosUsuario para el nuevo ingreso de informacion.
   */
  saveData(){
    console.log(this.commentData)
    let alerta = this.alertCtrl.create({
      title:"Datos enviados!",
      subTitle:"Información",
      message:"Los registros fueron enviados correctamente",
      buttons:['Ok']
    });
    alerta.present()
    this.formularioComment.reset()
    this.commentData = [];
  }

  deletePost(){
    this.postProvider.delete(this.post.id);
  }

  editPost(){
    this.navCtrl.push(EditPostPage,{ id : this.post.id });
  }

}