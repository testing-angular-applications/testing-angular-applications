import { Cat } from './cat';

describe('Test Cat getters and setters.', () => {
  it('The cat name should be Gracie', () => {
    const cat = new Cat();
    cat.setName('Gracie');
    const catName = cat.getName();
    expect(catName).toEqual('Gracie');
  });
});
