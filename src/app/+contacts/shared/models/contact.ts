export default class ContactClass {
  public id: number;
  public name: string;
  public email: string;
  public number: string;
  public country: string;
  public favorite: boolean;

  constructor() {}

  getId(): number {
    return this.id;
  }

  setId(id: number): void {
    this.id = id;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getEmail(): string {
    return this.email;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  getNumber(): string {
    return this.number;
  }

  setNumber(number: string): void {
    this.number = number;
  }

  getCountry(): string {
    return this.country;
  }

  setCountry(country: string): void {
    this.country = country;
  }

  setFavorite(favorite: boolean): void {
    this.favorite = favorite;
  }

  getFavorite(): boolean {
    return this.favorite;
  }
}
