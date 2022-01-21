export class Product {
  constructor(
    private id: number,
    private name: string,
    private tags: string[]
  ) {}

  static toProductModel(data: any): Product {
    return new Product(data.id, data.name, data.tags);
  }

  public getId() {
    return this.id;
  }

  public getName() {
    return this.name;
  }

  public getTags() {
    return this.tags;
  }
}
