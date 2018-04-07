export class Post {

	id: number;
  description: string;
  image: string;
  longitude: number;
  latitude: number;
  address: string;
  category: Category;
	constructor(
  	description: string,
  	image: string,
  	latitude: number,
  	longitude: number,
  	address: string,
  	category: Category,
  	id?:number) {
  	this.id = id;
		this.description = descripcion;
  	category: Category)
		this.description = description;
		this.image = image;
		this.longitude = longitude;
		this.latitude = latitude;
		this.address = address;
		this.category = Category.ADOPCION;
		this.category = category;
	}
}

export enum Category {
	BUSCO,
	PERDIDO,
	LASTIMADO,
	CALLEJERO
}
