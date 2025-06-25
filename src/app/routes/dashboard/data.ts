import { ApexOptions } from 'apexcharts';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

export const MESSAGES = [
  {
    img: 'images/heros/1.jpg',
    subject: 'Hydrogen',
    content: `Cras sit amet nibh libero, in gravida nulla.
     Nulla vel metus scelerisque ante sollicitudin commodo.`,
  },
  {
    img: 'images/heros/2.jpg',
    subject: 'Helium',
    content: `Cras sit amet nibh libero, in gravida nulla.
     Nulla vel metus scelerisque ante sollicitudin commodo.`,
  },
  {
    img: 'images/heros/3.jpg',
    subject: 'Lithium',
    content: `Cras sit amet nibh libero, in gravida nulla.
     Nulla vel metus scelerisque ante sollicitudin commodo.`,
  },
  {
    img: 'images/heros/4.jpg',
    subject: 'Beryllium',
    content: `Cras sit amet nibh libero, in gravida nulla.
     Nulla vel metus scelerisque ante sollicitudin commodo.`,
  },
  {
    img: 'images/heros/6.jpg',
    subject: 'Boron',
    content: `Cras sit amet nibh libero, in gravida nulla.
     Nulla vel metus scelerisque ante sollicitudin commodo.`,
  },
];

export const STATS = [
  {
    title: 'Total Sales',
    amount: '180,200',
    progress: {
      value: 50,
    },
    color: 'bg-azure-50',
  },
  {
    title: 'Revenue',
    amount: '70,205',
    progress: {
      value: 70,
    },
    color: 'bg-blue-50',
  },
  {
    title: 'Traffic',
    amount: '1,291,922',
    progress: {
      value: 80,
    },
    color: 'bg-green-50',
  },
  {
    title: 'New User',
    amount: '1,922',
    progress: {
      value: 40,
    },
    color: 'bg-cyan-50',
  },
];

export const CHARTS: ApexOptions[] = [
  {
    chart: {
      height: 350,
      type: 'area',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    series: [
      {
        name: 'UV',
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: 'Download',
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],
    xaxis: {
      type: 'datetime',
      categories: [
        '2019-11-24T00:00:00',
        '2019-11-24T01:30:00',
        '2019-11-24T02:30:00',
        '2019-11-24T03:30:00',
        '2019-11-24T04:30:00',
        '2019-11-24T05:30:00',
        '2019-11-24T06:30:00',
      ],
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm',
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
    },
  },
  {
    chart: {
      height: 350,
      type: 'radar',
    },
    series: [
      {
        name: 'Weekly Revenue',
        data: [30, 110, 50, 40, 60, 90, 45],
      },
    ],
    labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    plotOptions: {
      radar: {
        size: 140,
        polygons: {
          strokeColors: '#e9e9e9',
          fill: {
            colors: ['#f8f8f8', '#fff'],
          },
        },
      },
    },
    colors: ['#FF4560'],
    markers: {
      size: 4,
      strokeWidth: 2,
    },
    tooltip: {
      y: {
        formatter: (val: number) => val.toString(),
      },
    },
    yaxis: {
      tickAmount: 7,
      labels: {
        formatter: (val: number, i: number) => {
          if (i % 2 === 0) {
            return val.toString();
          } else {
            return '';
          }
        },
      },
    },
  },
];
