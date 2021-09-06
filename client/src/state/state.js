import { atom } from 'recoil';


export const yearState = atom({
    key: 'yearState',
    default: 2019,
});

export const cIdState = atom({
    key: 'cIdState',
    default: 0,
});

export const aIdState = atom({
    key: 'aIdState',
    default:0,
});

export const InfoState = atom({
    key: 'InfoState',
    default:true,
});