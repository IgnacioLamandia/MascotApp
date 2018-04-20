export class Post {

  id: number;
  title: string;
  description: string;
  image: string;
  latitude: number;
  longitude: number;
  address: string;
  category: Category;

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
	}
}

export enum Category {
	PERDIDO,
	ENCONTRADO,
	ADOPCION
}
