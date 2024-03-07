export class CreatePosterRequest {
  title: String
  address: String
  phone: String
  description: String

  constructor(title: String, address: String, phone: String, description: String) {
    this.title = title
    this.address = address
    this.phone = phone
    this.description = description
  }
}
