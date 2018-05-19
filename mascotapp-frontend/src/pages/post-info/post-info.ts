import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Post } from '../../model/Post';
import { PostProvider } from '../../providers/posts/post';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import { EditPostPage } from '../edit-post/edit-post';
import { AuthService } from '../../services/auth.service';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public restPosts: PostProvider,private fb: FormBuilder, private alertCtrl:AlertController,private auth: AuthService) {
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
    return this.post.creator && this.auth.getUser() && (this.auth.getUser().uid ==this.post.creator.external_id); //ver logica de como definir cuando es mi post
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
    this.postProvider.deletePost(this.post.id).then((result) => {
      this.returnHome();
    }, (err) => {
      console.log(err);
    });
  }

  returnHome() {
    let confirmacion= this.alertCtrl.create({
      title:'Confirmacion de eliminacion',
      message: 'Su publicación se elimino correctamente',
      buttons:[{
        text:'Ok',
        handler:()=>{
          this.navCtrl.push(HomePage);
        }
      }]
    });
    confirmacion.present();
  }

  editPost(){
    this.navCtrl.push(EditPostPage,{ id : this.post.id });
  }

 /*isNotMyPostAndNewState(post: Post) {
    //agregar condicion para ver que NO es mi post
    return post.state == PostState['0']; //lo tuve que poner asi pq no me toma el 0 solo
  }

  isMyPostAndRequestState(post: Post){
    //agregar condicion para ver que ES mi post
    return post.state == 1;
  }

  isNotMyPostAndRequestConfirmedState(post: Post) {
    //agregar condicion para ver que NO es mi post
    return post.state == 2;
  }

  isMyPostAndCollectState(post: Post) {
    //agregar condicion para ver que ES mi post
    return post.state == 3;
  }

  isClosed(post: Post) {
    return post.state == 4;
    //VER SI GENERAR HISTORIAL O ALGO ASI
  }

  requestPost(post: Post) {
    post.state = PostState.Request;
    this.postProvider.updatePost(post.id, post);
    console.log(post.state);
    console.log(post);
  }

  decline(post: Post) {
    post.state = PostState.New;
    this.postProvider.updatePost(post.id, post);
  }

  confirmRequest(post: Post) {
    post.state = PostState.RequestConfirmed;
    this.postProvider.updatePost(post.id, post);
    console.log(post);
    console.log(post.state);
  }

  collectPost(post: Post) {
    post.state = PostState.Collect;
    this.postProvider.updatePost(post.id, post);
    console.log(post);
    console.log(post.state);
  }

  collectNotDone(post: Post) {
    post.state = PostState.New;
    this.postProvider.updatePost(post.id, post);
    console.log(post);
    console.log(post.state);
  }

  collectDone(post: Post) {
    post.state = PostState.CollectDone;
    this.postProvider.updatePost(post.id, post);
    console.log(post);
    console.log(post.state);
  }*/

}
