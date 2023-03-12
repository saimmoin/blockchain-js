const ChainUtil = require('../chain-util');
const { DIFFICULTY, MINE_RATE } = require('../config.js');

class Block{
    constructor(timestamp, lasthash, hash, data, nonce, difficulty){
        this.timestamp = timestamp;
        this.lasthash = lasthash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty|| DIFFICULTY;
    }
    
    toString(){
        return `Block -
        Timestamp   : ${this.timestamp}
        Last Hash   : ${this.lasthash}
        Hash        : ${this.hash}
        Nonce       : ${this.nonce}
        Difficulty  : ${this.difficulty}
        Data        : ${this.data}`
    }

    static genesis() {
        return new this('GenesisBlockTime', 'empty', 'hashvalue', [], 0, DIFFICULTY);
    }

    static mineBlock(lastBlock, data) {
        let hash, timestamp;
	
	const lastHash = lastBlock.hash;
    let {difficulty} = lastBlock;
    let nonce = 0;
    do {
        nonce++;
        timestamp = Date.now();
        difficulty = Block.adjustDifficulty(lastBlock, timestamp);
        hash = Block.hash(timestamp,lastHash,data, nonce,difficulty);
    } while(hash.substring(0, difficulty) !== '0'.repeat(difficulty));
  
    return new this(timestamp, lastHash, hash, data,nonce,difficulty);
    }

    static hash(timestamp, lastHash, data, nonce, difficulty) {
        return ChainUtil.hash(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
    }

    static adjustDifficulty(lastBlock, currentTime){
        let { difficulty } = lastBlock;
        difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty+1 : difficulty-1;
        return difficulty;
    }
}

module.exports = Block;