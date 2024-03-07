export class PosterCardModel {
  id: string;
  title: string;
  address: string;
  description: string;
  image: string;

  constructor(
    id: string,
    title: string,
    address: string,
    description: string,
    image: string
  ) {
    this.id = id;
    this.title = title;
    this.address = address;
    this.description = description;
    this.image = image;
  }
}
