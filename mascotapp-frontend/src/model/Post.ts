export class Post {

  id: number;
  title: string;
  description: string;
  image: string;
  latitude: number;
  longitude: number;
  address: string;
  category: Category;
  comments: Comment[];
  state: PostState;

	constructor(
    title: string,
  	description: string,
  	image: string,
  	address: string,
  	category: Category,
  	id?:number)	{

  	this.id = id;
    this.title = title
		this.description = description;
		this.image = image;
		this.longitude = 0;
		this.latitude = 0;
		this.address = address;
		this.category = category;
    this.comments = [];
    this.state = PostState['0'];
	}
}

export enum Category {
	PERDIDO,
	ENCONTRADO,
	ADOPCION
}

export class Comment {

  id: number;
  text: string;
  name: string;
  email: string;

  constructor(
    text: string,
    name: string,
    email: string,
  	id?:number) {
    
    this.id = id;
    this.text = text;
    this.name = name;
    this.email = email;
  }
}

  export enum PostState {
    New,
    Request,
    RequestConfirmed,
    Collect, 
    CollectDone
}