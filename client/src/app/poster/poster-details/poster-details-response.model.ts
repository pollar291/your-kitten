export class PosterDetailsResponse {
  address: String;
  description: String;
  id: String;
  images: String[];
  phone: String;
  status: String;
  title: String;

  constructor(
    address: String,
    description: String,
    id: String,
    images: String[],
    phone: String,
    status: String,
    title: String
  ) {
    this.address = address;
    this.description = description;
    this.id = id;
    this.images = images;
    this.phone = phone;
    this.status = status;
    this.title = title;
  }
}
