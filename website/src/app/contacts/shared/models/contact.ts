export default class ContactClass {
  private _id: number;
  private _name: string;
  private _email: string;
  private _number: string;
  private _country: string;
  private _favorite: boolean;

  constructor(name?: string) {
    this._name = name;
  }

  get id(): number {
    return this._id;
  }

  set id(id: number)  {
    this._id = id;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get email(): string {
    return this._email;
  }

  set email(email: string) {
    this._email = email;
  }

  get number(): string {
    return this._number;
  }

  set number(number: string) {
    this._number = number;
  }

  get country(): string {
    return this._country;
  }

  set country(country: string) {
    this._country = country;
  }

  set favorite(favorite: boolean) {
    this._favorite = favorite;
  }

  get favorite(): boolean {
    return this._favorite;
  }
}
