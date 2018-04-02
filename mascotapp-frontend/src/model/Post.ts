export class Post {

	id: number;
  description: string;
  image: string;
  longitude: number;
  latitude: number;
  address: string;
  category: Category;

	constructor(
  	descripcion: string,
  	imagen: string,
  	latitude: number,
  	longitude: number,
  	address: string,
  	category: Category,
  	id?:number) {
  	this.id = id;
		this.description = descripcion;
		this.image = imagen;
		this.longitude = longitude;
		this.latitude = latitude;
		this.address = address;
		this.category = Category.ADOPCION;
	}
}

export enum Category {
  ENCONTRADO = "Encontrado",
	PERDIDO = "Perdido",
	ADOPCION = "En Adopcion"
}
