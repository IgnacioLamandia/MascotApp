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
	}
}

export enum Category {
	PERDIDO,
	ENCONTRADO,
	ADOPCION
}

export class Comment {
  text: string;
  name: string;
  email: string;

  constructor(
    text: string,
    name: string,
    email: string) {

    this.text = text;
    this.name = name;
    this.email = email;
  }
}

