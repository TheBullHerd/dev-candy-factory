import { PublicKey } from '@solana/web3.js';

export const PRESALE_CONTRACT_ID = new PublicKey('ARaZjfJmfW2Z3w3wk9AQ7QfYZbYbEUaVoaHDDDZ4veoN');

export const PRESALE_CONTRACT_ACCOUNT = new PublicKey('9D5GgtBDB91BU64F3SjFy8etKCMWKZLiXBmoBar39He5');

export const CONTRACT_PIVATE_KEY = '[244,17,247,206,205,188,200,115,230,195,109,220,177,105,52,238,29,175,151,107,131,84,176,139,62,39,111,72,236,130,248,65,206,37,199,153,150,164,141,32,253,51,11,123,43,226,165,62,190,99,197,219,166,10,189,211,195,13,134,27,146,108,179,13]';

export const MINTER_STATUS = {
    Available           : 0,
    NotExistInWhiteList : 1,
    AlreadyMinted       : 2,
    PreSaleNoItem       : 3,
    PreSaleEnded        : 4,
    PreSaleNotStarted   : 5,
};
