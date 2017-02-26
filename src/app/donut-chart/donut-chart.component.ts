import { 
  Component, 
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild
} from '@angular/core';
import * as D3 from 'd3';
import { ChartDataService } from '../data/chart-data.service';

@Component({
  selector: 'donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css']
})
export class DonutChartComponent implements OnInit, AfterViewInit {
  
  @ViewChild('container') element: ElementRef;

  private width: number;
  private height: number;
  private radius: number;
  private svg;
  private arc;
  private color = D3.scaleOrdinal(["#F25F5C", "#F47C79", "#F7A7A6"]);

  private chartData: {name: string, value: number}[];
  
  private selector: D3.Selection<any, any, any, any>;
  private ele: HTMLElement;

  constructor(private chartDataService: ChartDataService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
   this.ele = this.element.nativeElement;
   this.selector = D3.select(this.ele);
   this.chartData = this.chartDataService.getChartData();
   this.setup();
   this.createSvg();
   this.draw();
  }

  setup() {
    this.width = 960;
    this.height = 500;
    this.radius = Math.min(this.width, this.height) / 2;
    this.arc = D3.arc()
      .outerRadius(this.radius - 10)
      .innerRadius(this.radius - 70);
  } 

  createSvg() {
    this.selector.html('');
    this.svg = this.selector.append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
    .append('g')
      .attr('transform', `translate(${this.width/2}, ${this.height/2})`);
  }

  draw() {
    let g = this.svg.selectAll('.arc')
      .data(D3.pie().value((d:any) => d.value)(<any>this.chartData))
      .enter().append("g")
      .attr('class', 'arc');
    
    g.append('path')
      .attr('d', this.arc)
      .style('fill', (d) => this.color(d.data.name));

    g.append('text')
      .attr('transform', d => `translate(${this.arc.centroid(d)})`)
      .attr('dy', '.35em')
      .text(d => d.data.name);
  
  }

  redraw() {

  }

}
