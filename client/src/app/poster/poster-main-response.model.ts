export class PosterMainResponse {
  id: string;
  title: string;
  name: string;
  address: string;
  phone: string;
  status: string;
  description: string;
  authorEmail: string;
  images: number[];

  constructor(
    id: string,
    title: string,
    name: string,
    address: string,
    phone: string,
    status: string,
    description: string,
    authorEmail: string,
    images: number[]
  ) {
    this.id = id;
    this.title = title;
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.status = status;
    this.description = description;
    this.authorEmail = authorEmail;
    this.images = images;
  }
}
