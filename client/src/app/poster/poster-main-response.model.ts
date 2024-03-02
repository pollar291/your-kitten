export class PosterMainResponse {
  id: string;
  title: string;
  address: string;
  phone: string;
  status: string;
  description: string;
  images: number[];

  constructor(
    id: string,
    title: string,
    address: string,
    phone: string,
    status: string,
    description: string,
    images: number[]
  ) {
    this.id = id;
    this.title = title;
    this.address = address;
    this.phone = phone;
    this.status = status;
    this.description = description;
    this.images = images;
  }
}
