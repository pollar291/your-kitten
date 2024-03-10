export class CreatePosterRequest {
  title: string;
  name: string;
  address: string;
  phone: string;
  description: string;

  constructor(
    title: string,
    name: string,
    address: string,
    phone: string,
    description: string
  ) {
    this.title = title;
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.description = description;
  }
}
