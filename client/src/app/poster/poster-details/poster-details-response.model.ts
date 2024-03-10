export class PosterDetailsResponse {
  address: String;
  description: String;
  id: string;
  images: string[];
  phone: string;
  status: string;
  title: string;
  name: string;

  constructor(
    address: string,
    description: string,
    id: string,
    images: string[],
    phone: string,
    status: string,
    title: string,
    name: string
  ) {
    this.address = address;
    this.description = description;
    this.id = id;
    this.images = images;
    this.phone = phone;
    this.status = status;
    this.title = title;
    this.name = name;
  }
}
