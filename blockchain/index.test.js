const Blockchain = require('./index');
const Block = require('./block');

describe('Blockchain', () => {
  let bc;
  let bc2;

  beforeEach(() => {
    bc2 = new Blockchain();
    bc = new Blockchain();
  });

  it('starts with the genesis block', () => {
	  expect(bc.chain[0]).toEqual(Block.genesis());
  });

  it('adds a new block', () => {
    const data = 'transaction';
    bc.addBlock(data);
    expect(bc.chain[bc.chain.length-1].data).toEqual(data);
  });

  it('validates a valid chain', ()=> {
    bc2.addBlock("xyz");
    expect(bc.isValidChain(bc2.chain)).toBe(true);
  });

  it('invalidates a chain with a corrupt genesis block', () => {
    bc2.chain[0].data = 'Bad data';
    expect(bc.isValidChain(bc2.chain)).toBe(false);
  });
  
  it('replace the chain with valid chain', () => {
    bc2.addBlock('new Block in bc2');
    bc.replaceChain(bc2.chain);

    expect(bc.chain).toEqual(bc2.chain);
  });

  it('Not replace the chain if coming chain is less than or equal to the length of current chain', ()=>{
    bc.addBlock('asdffff');
    bc.replaceChain(bc2.chain);
    expect(bc.chain).not.toEqual(bc2.chain);
  })

});

