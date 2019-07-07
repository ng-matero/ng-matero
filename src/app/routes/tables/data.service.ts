import { Injectable } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  gender?: string;
  mobile?: string;
  tele?: string;
  city?: string;
  address?: string;
  date?: string;
  website?: string;
  company?: string;
  email?: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    gender: 'male',
    mobile: '13198765432',
    tele: '80675432',
    city: 'Beijing',
    address: 'chaoyang',
    date: '1423456765768',
    website: 'www.matero.com',
    company: 'matero',
    email: 'nzb329@163.com',
  },
  {
    position: 2,
    name: 'Helium',
    weight: 4.0026,
    symbol: 'He',
    gender: 'male',
    mobile: '13198765432',
    tele: '80675432',
    city: 'Beijing',
    address: 'chaoyang',
    date: '1423456765768',
    website: 'www.matero.com',
    company: 'matero',
    email: 'nzb329@163.com',
  },
  {
    position: 3,
    name: 'Lithium',
    weight: 6.941,
    symbol: 'Li',
    gender: 'male',
    mobile: '13198765432',
    tele: '80675432',
    city: 'Beijing',
    address: 'chaoyang',
    date: '1423456765768',
    website: 'www.matero.com',
    company: 'matero',
    email: 'nzb329@163.com',
  },
  {
    position: 4,
    name: 'Beryllium',
    weight: 9.0122,
    symbol: 'Be',
    gender: 'male',
    mobile: '13198765432',
    tele: '80675432',
    city: 'Beijing',
    address: 'chaoyang',
    date: '1423456765768',
    website: 'www.matero.com',
    company: 'matero',
    email: 'nzb329@163.com',
  },
  {
    position: 5,
    name: 'Boron',
    weight: 10.811,
    symbol: 'B',
    gender: 'male',
    mobile: '13198765432',
    tele: '80675432',
    city: 'Beijing',
    address: 'chaoyang',
    date: '1423456765768',
    website: 'www.matero.com',
    company: 'matero',
    email: 'nzb329@163.com',
  },
  {
    position: 6,
    name: 'Carbon',
    weight: 12.0107,
    symbol: 'C',
    gender: 'male',
    mobile: '13198765432',
    tele: '80675432',
    city: 'Beijing',
    address: 'chaoyang',
    date: '1423456765768',
    website: 'www.matero.com',
    company: 'matero',
    email: 'nzb329@163.com',
  },
  {
    position: 7,
    name: 'Nitrogen',
    weight: 14.0067,
    symbol: 'N',
    gender: 'male',
    mobile: '13198765432',
    tele: '80675432',
    city: 'Beijing',
    address: 'chaoyang',
    date: '1423456765768',
    website: 'www.matero.com',
    company: 'matero',
    email: 'nzb329@163.com',
  },
  {
    position: 8,
    name: 'Oxygen',
    weight: 15.9994,
    symbol: 'O',
    gender: 'male',
    mobile: '13198765432',
    tele: '80675432',
    city: 'Beijing',
    address: 'chaoyang',
    date: '1423456765768',
    website: 'www.matero.com',
    company: 'matero',
    email: 'nzb329@163.com',
  },
  {
    position: 9,
    name: 'Fluorine',
    weight: 18.9984,
    symbol: 'F',
    gender: 'male',
    mobile: '13198765432',
    tele: '80675432',
    city: 'Beijing',
    address: 'chaoyang',
    date: '1423456765768',
    website: 'www.matero.com',
    company: 'matero',
    email: 'nzb329@163.com',
  },
  {
    position: 10,
    name: 'Neon',
    weight: 20.1797,
    symbol: 'Ne',
    gender: 'male',
    mobile: '13198765432',
    tele: '80675432',
    city: 'Beijing',
    address: 'chaoyang',
    date: '1423456765768',
    website: 'www.matero.com',
    company: 'matero',
    email: 'nzb329@163.com',
  },
];

@Injectable()
export class DataService {
  getData() {
    return ELEMENT_DATA;
  }
}
