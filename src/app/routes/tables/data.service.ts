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
    city: 'New York',
    address: '555 Lexington Avenue',
    date: '1423456765768',
    website: 'www.matero.com',
    company: 'matero',
    email: 'Hydrogen@gmail.com',
  },
  {
    position: 2,
    name: 'Helium',
    weight: 4.0026,
    symbol: 'He',
    gender: 'male',
    mobile: '13034676675',
    tele: '80675432',
    city: 'Shanghai',
    address: '88 Songshan Road',
    date: '1423456765768',
    website: 'www.matero.com',
    company: 'matero',
    email: 'Helium@gmail.com',
  },
  {
    position: 3,
    name: 'Lithium',
    weight: 6.941,
    symbol: 'Li',
    gender: 'male',
    mobile: '15376892233',
    tele: '80675432',
    city: 'Los Angeles',
    address: '48400 Seminole Dr.,Cabazon',
    date: '1423456765768',
    website: 'www.matero.com',
    company: 'matero',
    email: 'Lithium@gmail.com',
  },
  {
    position: 4,
    name: 'Beryllium',
    weight: 9.0122,
    symbol: 'Be',
    gender: 'male',
    mobile: '13765443298',
    tele: '80675432',
    city: 'Beijing',
    address: 'chaoyang',
    date: '1423456765768',
    website: 'www.matero.com',
    company: 'matero',
    email: 'Beryllium@gmail.com',
  },
  {
    position: 5,
    name: 'Boron',
    weight: 10.811,
    symbol: 'B',
    gender: 'male',
    mobile: '13198765432',
    tele: '80675432',
    city: 'Berlin',
    address: 'Bernauer Str.111,13355',
    date: '1423456765768',
    website: 'www.matero.com',
    company: 'matero',
    email: 'Boron@gmail.com',
  },
  {
    position: 6,
    name: 'Carbon',
    weight: 12.0107,
    symbol: 'C',
    gender: 'male',
    mobile: '13166665432',
    tele: '80675432',
    city: 'Madrid',
    address: 'Madrid International Exhibition Center',
    date: '1423456765768',
    website: 'www.matero.com',
    company: 'matero',
    email: 'Carbon@gmail.com',
  },
  {
    position: 7,
    name: 'Nitrogen',
    weight: 14.0067,
    symbol: 'N',
    gender: 'male',
    mobile: '15811112222',
    tele: '80675432',
    city: 'Sydney',
    address: 'Circular Quay, Sydney NSW 2000',
    date: '1423456765768',
    website: 'www.matero.com',
    company: 'matero',
    email: 'Nitrogen@gmail.com',
  },
  {
    position: 8,
    name: 'Oxygen',
    weight: 15.9994,
    symbol: 'O',
    gender: 'male',
    mobile: '15044558899',
    tele: '80675432',
    city: 'Washington',
    address: 'University of Washington',
    date: '1423456765768',
    website: 'www.matero.com',
    company: 'matero',
    email: 'Oxygen@gmail.com',
  },
  {
    position: 9,
    name: 'Fluorine',
    weight: 18.9984,
    symbol: 'F',
    gender: 'male',
    mobile: '13198666677',
    tele: '80675432',
    city: 'London',
    address: 'unkown',
    date: '1423456765768',
    website: 'www.matero.com',
    company: 'matero',
    email: 'Fluorine@gmail.com',
  },
  {
    position: 10,
    name: 'Neon',
    weight: 20.1797,
    symbol: 'Ne',
    gender: 'male',
    mobile: '17098765432',
    tele: '12345678',
    city: 'Paris',
    address: 'Rue Croix des Petits Champs',
    date: '1423456765768',
    website: 'www.matero.com',
    company: 'matero',
    email: 'Neon@gmail.com',
  },
];

@Injectable()
export class DataService {
  getData() {
    return ELEMENT_DATA;
  }
}
