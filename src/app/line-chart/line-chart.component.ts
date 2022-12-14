import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import * as d3 from "d3v6";
import { LINE_CHART_DATA } from "./data";

const data = [];

@Component({
  selector: "app-line-chart",
  templateUrl: "./line-chart.component.html",
  styleUrls: ["./line-chart.component.scss"],
})
export class LineChartComponent implements OnInit {
  private width = 700;
  private height = 400;
  private margin = 10;

  public svg;
  public svgInner;
  public yScale;
  public xScale;
  public xAxis;
  public yAxis;
  public lineGroup;

  data = LINE_CHART_DATA;

  @ViewChild("chartContainer", { static: true }) chartContainer: ElementRef;

  constructor() {}

  ngOnInit() {
    this.initializeChart();
    this.drawChart();
  }

  public ngOnChanges(changes): void {
    if (changes.hasOwnProperty("data") && this.data) {
      console.log(this.data);
      this.initializeChart();
      this.drawChart();

      window.addEventListener("resize", () => this.drawChart());
    }
  }

  private initializeChart(): void {
    this.svg = d3
      .select(".linechart")
      .append("svg")
      .attr("height", this.height + this.margin);
    this.svgInner = this.svg
      .append("g")
      .style(
        "transform",
        "translate(" + this.margin + "px, " + this.margin + "px)"
      );

    this.yScale = d3
      .scaleLinear()
      .domain([
        d3.max(this.data, (d) => d.value) + 1,
        d3.min(this.data, (d) => d.value) - 1,
      ])
      .range([0, this.height - 2 * this.margin]);

    this.yAxis = this.svgInner
      .append("g")
      .attr("id", "y-axis")
      .style("transform", "translate(" + this.margin + "px,  0)");

    this.xScale = d3
      .scaleTime()
      .domain(d3.extent(this.data, (d) => new Date(d.timestamp)));

    this.xAxis = this.svgInner
      .append("g")
      .attr("id", "x-axis")
      .style(
        "transform",
        "translate(0, " + (this.height - 2 * this.margin) + "px)"
      );

    this.lineGroup = this.svgInner
      .append("g")
      .append("path")
      .attr("id", "line")
      .style("fill", "none")
      .style("stroke", "red")
      .style("stroke-width", "2px");
  }

  private drawChart(): void {
    this.width =
      this.chartContainer.nativeElement.getBoundingClientRect().width;
    this.svg.attr("width", this.width);

    this.xScale.range([this.margin, this.width - 2 * this.margin]);

    const xAxis = d3
      .axisBottom(this.xScale)
      .ticks(10)
      .tickFormat(d3.timeFormat("%m / %Y"));

    this.xAxis.call(xAxis);

    const yAxis = d3.axisLeft(this.yScale);

    this.yAxis.call(yAxis);

    const line = d3
      .line()
      .x((d) => d[0])
      .y((d) => d[1])
      .curve(d3.curveMonotoneX);

    const points: [number, number][] = this.data.map((d) => [
      this.xScale(new Date(d.timestamp)),
      this.yScale(d.value),
    ]);

    this.lineGroup.attr("d", line(points));
  }
}
