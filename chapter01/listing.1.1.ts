export class Cat {
  private _name: string = '';

  constructor(name? : string) {
    this._name = name;
  }

  getName() : string {
    return this._name;
  }

  setName(name : string) {
    this._name = name;
  }

  toString() : string {
    return `This cat's name is ${this._name}!`;
  }
}

const cat = new Cat('Nicky');
