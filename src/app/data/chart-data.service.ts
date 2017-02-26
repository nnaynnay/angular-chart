import { Injectable } from '@angular/core';
import { ChartData } from './chart-data.mock';

@Injectable()
export class ChartDataService {

  constructor() { }

  getChartData(): {name: string, value: number}[] {
    return ChartData;
  }

}
