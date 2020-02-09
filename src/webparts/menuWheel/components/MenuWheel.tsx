import * as React from "react";
import { IMenuWheelProps } from "./IMenuWheelProps";
import * as Chart from "chart.js";

//import "chartjs-plugin-labels";
import {
  ActionButton,
  ContextualMenuItemType,
  DirectionalHint,
  Callout
} from "office-ui-fabric-react";
import ChartDataLabels from "chartjs-plugin-datalabels";

export const MenuWheel: React.FC<IMenuWheelProps> = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>();
  const contextualMenuDialogRef = React.useRef();

  const helpers = Chart.helpers;
  // this option will control the white space between embedded charts when there is more than 1 dataset
  helpers.extend(Chart.defaults.doughnut, {
    datasetRadiusBuffer: 0
  });
  const [contextualMenuDialog, setContextualMenuDialog] = React.useState(false);
  const [directionalHint, setDirectionalHint] = React.useState<
    0 | 2 | 1 | 12 | 6 | 5 | 7 | 8 | 4 | 13 | 3 | 9 | 10 | 11
  >(12);

  const [ctx, setCtx] = React.useState();
  const [menu, setMenu] = React.useState();

  const getDirectionalHint = (x: number): number => {
    if (x >= 712 && x <= 1252) {
      return 1;
    }

    return 12;
  };

  React.useEffect(() => {
    if (canvasRef) {
      setCtx(canvasRef.current.getContext("2d"));
    }
  }, [canvasRef]);

  // React.useEffect(() => {
  //   // this option will control the white space between embedded charts when there is more than 1 dataset

  //   if (menu) {
  //     Chart.controllers.doughnut = Chart.controllers.doughnut.extend({
  //       update: function(reset) {
  //         var me = this;
  //         var chart = me.chart,
  //           chartArea = chart.chartArea,
  //           opts = chart.options,
  //           arcOpts = opts.elements.arc,
  //           availableWidth =
  //             chartArea.right - chartArea.left - arcOpts.borderWidth,
  //           availableHeight =
  //             chartArea.bottom - chartArea.top - arcOpts.borderWidth,
  //           minSize = Math.min(availableWidth, availableHeight),
  //           offset = {
  //             x: 0,
  //             y: 0
  //           },
  //           meta = me.getMeta(),
  //           cutoutPercentage = opts.cutoutPercentage,
  //           circumference = opts.circumference;

  //         // If the chart's circumference isn't a full circle, calculate minSize as a ratio of the width/height of the arc
  //         if (circumference < Math.PI * 2.0) {
  //           var startAngle = opts.rotation % (Math.PI * 2.0);
  //           startAngle +=
  //             Math.PI *
  //             2.0 *
  //             (startAngle >= Math.PI ? -1 : startAngle < -Math.PI ? 1 : 0);
  //           var endAngle = startAngle + circumference;
  //           var start = { x: Math.cos(startAngle), y: Math.sin(startAngle) };
  //           var end = { x: Math.cos(endAngle), y: Math.sin(endAngle) };
  //           var contains0 =
  //             (startAngle <= 0 && 0 <= endAngle) ||
  //             (startAngle <= Math.PI * 2.0 && Math.PI * 2.0 <= endAngle);
  //           var contains90 =
  //             (startAngle <= Math.PI * 0.5 && Math.PI * 0.5 <= endAngle) ||
  //             (startAngle <= Math.PI * 2.5 && Math.PI * 2.5 <= endAngle);
  //           var contains180 =
  //             (startAngle <= -Math.PI && -Math.PI <= endAngle) ||
  //             (startAngle <= Math.PI && Math.PI <= endAngle);
  //           var contains270 =
  //             (startAngle <= -Math.PI * 0.5 && -Math.PI * 0.5 <= endAngle) ||
  //             (startAngle <= Math.PI * 1.5 && Math.PI * 1.5 <= endAngle);
  //           var cutout = cutoutPercentage / 100.0;
  //           var min = {
  //             x: contains180
  //               ? -1
  //               : Math.min(
  //                   start.x * (start.x < 0 ? 1 : cutout),
  //                   end.x * (end.x < 0 ? 1 : cutout)
  //                 ),
  //             y: contains270
  //               ? -1
  //               : Math.min(
  //                   start.y * (start.y < 0 ? 1 : cutout),
  //                   end.y * (end.y < 0 ? 1 : cutout)
  //                 )
  //           };
  //           var max = {
  //             x: contains0
  //               ? 1
  //               : Math.max(
  //                   start.x * (start.x > 0 ? 1 : cutout),
  //                   end.x * (end.x > 0 ? 1 : cutout)
  //                 ),
  //             y: contains90
  //               ? 1
  //               : Math.max(
  //                   start.y * (start.y > 0 ? 1 : cutout),
  //                   end.y * (end.y > 0 ? 1 : cutout)
  //                 )
  //           };
  //           var size = {
  //             width: (max.x - min.x) * 0.5,
  //             height: (max.y - min.y) * 0.5
  //           };
  //           minSize = Math.min(
  //             availableWidth / size.width,
  //             availableHeight / size.height
  //           );
  //           offset = { x: (max.x + min.x) * -0.5, y: (max.y + min.y) * -0.5 };
  //         }

  //         chart.borderWidth = me.getMaxBorderWidth(meta.data);
  //         chart.outerRadius = Math.max((minSize - chart.borderWidth) / 2, 0);
  //         chart.innerRadius = Math.max(
  //           cutoutPercentage ? (chart.outerRadius / 100) * cutoutPercentage : 0,
  //           0
  //         );
  //         chart.radiusLength =
  //           (chart.outerRadius - chart.innerRadius) /
  //             chart.getVisibleDatasetCount() +
  //           25;
  //         chart.offsetX = offset.x * chart.outerRadius;
  //         chart.offsetY = offset.y * chart.outerRadius;

  //         meta.total = me.calculateTotal();

  //         me.outerRadius =
  //           chart.outerRadius - chart.radiusLength * me.getRingIndex(me.index);
  //         me.innerRadius = Math.max(me.outerRadius - chart.radiusLength, 0);

  //         // factor in the radius buffer if the chart has more than 1 dataset
  //         if (me.index > 0) {
  //           me.outerRadius -= opts.datasetRadiusBuffer;
  //           me.innerRadius -= opts.datasetRadiusBuffer;
  //         }
  //         console.log("!!!!!s");
  //         helpers.each(meta.data, function(arc, index) {
  //           console.log("!!!!!s");
  //           me.updateElement(arc, index, reset);
  //         });
  //       }
  //     });
  //   }
  // }, [menu]);

  React.useEffect(() => {
    if (menu) {
      Chart.pluginService.register({
        beforeDraw: function(chart) {
          const width = chart.width;
          const height = chart.height;
          const ctx = chart.ctx;

          ctx.restore();
          var fontSize = (height / 114).toFixed(2);
          //ctx.font = fontSize + "em sans-serif";

          ctx.textBaseline = "middle";

          // var text = "75%",
          //   textX = Math.round((width - ctx.measureText(text).width) / 2),
          //   textY = height / 2;

          var centerX = width / 2;
          var centerY = height / 2;
          var radius = 160;

          // ctx.beginPath();
          // ctx.moveTo(centerX, centerY);
          // ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
          // ctx.fillStyle = "#red";
          // ctx.shadowColor = "black";
          // // ctx.strokeStyle = "rgba(0,0,0,1)";
          //  ctx.shadowBlur = 4;

          // ctx.shadowOffsetX = 0;
          // ctx.shadowOffsetY = 0;
          // ctx.fill();
          // ctx.lineWidth = 2;
          // ctx.stroke();
          // ctx.closePath();

          const imageFile: any = document.getElementById("source");
          const imageX = Math.round((width - imageFile.width) / 2);
          const imageY = height / 2;

          // ctx.fillText(text, textX, textY);

          ctx.drawImage(imageFile, imageX, imageY - 55, 200, 110);
          ctx.imageSmoothingEnabled = true;
          ctx.save();
        }
      });

      console.log("menu", menu);

      // canvasRef.current.onclick = evt => {
      //   var activePoints = menu.getElementsAtEvent(evt);

      //   var chartData = activePoints[0]["_chart"].config.data;
      //   var idx = activePoints[0]["_index"];

      //   var label = chartData.labels[idx];
      //   var value = chartData.datasets[0].data[idx];

      //   setDirectionalHint(getDirectionalHint(evt.x) as any);
      //   setContextualMenuDialog(true);

      //   activePoints[0]["_chart"]["_labels"];

      //   console.log("activePoints ", activePoints);
      // };
    }
  }, [menu]);

  React.useEffect(() => {
    if (ctx) {
      // Chart.controllers.doughnut = Chart.controllers.doughnut.extend({
      //   update: function(reset) {
      //     var me = this;
      //     var chart = me.chart,
      //       chartArea = chart.chartArea,
      //       opts = chart.options,
      //       arcOpts = opts.elements.arc,
      //       availableWidth =
      //         chartArea.right - chartArea.left - arcOpts.borderWidth,
      //       availableHeight =
      //         chartArea.bottom - chartArea.top - arcOpts.borderWidth,
      //       minSize = Math.min(availableWidth, availableHeight),
      //       offset = {
      //         x: 0,
      //         y: 0
      //       },
      //       meta = me.getMeta(),
      //       cutoutPercentage = opts.cutoutPercentage,
      //       circumference = opts.circumference;

      //     // If the chart's circumference isn't a full circle, calculate minSize as a ratio of the width/height of the arc
      //     if (circumference < Math.PI * 2.0) {
      //       var startAngle = opts.rotation % (Math.PI * 2.0);
      //       startAngle +=
      //         Math.PI *
      //         2.0 *
      //         (startAngle >= Math.PI ? -1 : startAngle < -Math.PI ? 1 : 0);
      //       var endAngle = startAngle + circumference;
      //       var start = { x: Math.cos(startAngle), y: Math.sin(startAngle) };
      //       var end = { x: Math.cos(endAngle), y: Math.sin(endAngle) };
      //       var contains0 =
      //         (startAngle <= 0 && 0 <= endAngle) ||
      //         (startAngle <= Math.PI * 2.0 && Math.PI * 2.0 <= endAngle);
      //       var contains90 =
      //         (startAngle <= Math.PI * 0.5 && Math.PI * 0.5 <= endAngle) ||
      //         (startAngle <= Math.PI * 2.5 && Math.PI * 2.5 <= endAngle);
      //       var contains180 =
      //         (startAngle <= -Math.PI && -Math.PI <= endAngle) ||
      //         (startAngle <= Math.PI && Math.PI <= endAngle);
      //       var contains270 =
      //         (startAngle <= -Math.PI * 0.5 && -Math.PI * 0.5 <= endAngle) ||
      //         (startAngle <= Math.PI * 1.5 && Math.PI * 1.5 <= endAngle);
      //       var cutout = cutoutPercentage / 100.0;
      //       var min = {
      //         x: contains180
      //           ? -1
      //           : Math.min(
      //               start.x * (start.x < 0 ? 1 : cutout),
      //               end.x * (end.x < 0 ? 1 : cutout)
      //             ),
      //         y: contains270
      //           ? -1
      //           : Math.min(
      //               start.y * (start.y < 0 ? 1 : cutout),
      //               end.y * (end.y < 0 ? 1 : cutout)
      //             )
      //       };
      //       var max = {
      //         x: contains0
      //           ? 1
      //           : Math.max(
      //               start.x * (start.x > 0 ? 1 : cutout),
      //               end.x * (end.x > 0 ? 1 : cutout)
      //             ),
      //         y: contains90
      //           ? 1
      //           : Math.max(
      //               start.y * (start.y > 0 ? 1 : cutout),
      //               end.y * (end.y > 0 ? 1 : cutout)
      //             )
      //       };
      //       var size = {
      //         width: (max.x - min.x) * 0.5,
      //         height: (max.y - min.y) * 0.5
      //       };
      //       minSize = Math.min(
      //         availableWidth / size.width,
      //         availableHeight / size.height
      //       );
      //       offset = { x: (max.x + min.x) * -0.5, y: (max.y + min.y) * -0.5 };
      //     }

      //     //chart.borderWidth = me.getMaxBorderWidth(meta.data);
      //     chart.outerRadius = Math.max((minSize - chart.borderWidth) / 2, 0);
      //     chart.innerRadius = Math.max(
      //       cutoutPercentage ? (chart.outerRadius / 100) * cutoutPercentage : 0,
      //       0
      //     );
      //     chart.radiusLength =
      //       (chart.outerRadius - chart.innerRadius) /
      //         chart.getVisibleDatasetCount() +
      //       25;
      //     chart.offsetX = offset.x * chart.outerRadius;
      //     chart.offsetY = offset.y * chart.outerRadius;

      //     meta.total = me.calculateTotal();

      //     me.outerRadius =
      //       chart.outerRadius - chart.radiusLength * me.getRingIndex(me.index);
      //     me.innerRadius = Math.max(me.outerRadius - chart.radiusLength, 0);

      //     // factor in the radius buffer if the chart has more than 1 dataset
      //     if (me.index > 0) {
      //       me.outerRadius -= opts.datasetRadiusBuffer;
      //       me.innerRadius -= opts.datasetRadiusBuffer;
      //     }
      //     console.log("!!!!!s");
      //     helpers.each(meta.data, function(arc, index) {
      //       console.log("!!!!!s");
      //       me.updateElement(arc, index, reset);
      //     });
      //   }
      // });
      setMenu(
        new Chart(ctx, {
          type: "doughnut",
          data: {
            datasets: [
              {
                data: [
                  6,
                  5,
                  7,

                  5,
                  5,
                  5,
                  5,
                  5,

                  5.6,
                  5.6,

                  5.6,
                  5.4,
                  5,
                  5.2,
                  4.8,

                  6,
                  5,

                  5,
                  6.2,
                  6.2,

                  5.4,
                  6,
                  6
                ],

                labels: [
                  "IT Road Map", //IT
                  "Heatmap", //IT
                  "ITG & Concept Papers", //IT

                  "Payroll", // Business Services
                  "Accounts Payable", // Business Services
                  "Accounts Receivable", // Business Services
                  "Fixed Assets", // Business Services
                  "Transactions", // Business Services

                  "Business Cases", //Business Finance Analytics & Reporting
                  `Reporting & Analytics Scenario's`, //Business Finance Analytics & Reporting

                  "Delegated Financial Authority (DFA)", // Corporate Finance & Governance
                  "Strategic Risks & Internal Audit", // Corporate Finance & Governance
                  "Statutory Accounts", // Corporate Finance & Governance
                  "Tax Compliance", // Corporate Finance & Governance
                  "Foreign Currency", // Corporate Finance & Governance

                  "Subcontractor Management", // "Procurement",
                  "Labour Hire", // "Procurement",

                  "Property Leases", // Property,
                  "Facilities Management", // Property,
                  "Property Instruction Sheet (PIS)", // Property,

                  "Tenders/ Contract Reviews", // "Legal"
                  `Contract Execution (DPA's)`, // "Legal"
                  "Bonds/ Insurance" // "Legal"
                ],
                backgroundColor: [
                  "rgb(255, 203, 102)",
                  "rgb(255, 203, 102)",
                  "rgb(255, 203, 102)",
                  "rgb(126, 203, 190)",
                  "rgb(126, 203, 190)",
                  "rgb(126, 203, 190)",
                  "rgb(126, 203, 190)",
                  "rgb(126, 203, 190)",
                  "rgb(213,135, 143)",
                  "rgb(213,135, 143)",
                  "rgb(164, 135, 190)",
                  "rgb(164, 135, 190)",
                  "rgb(164, 135, 190)",
                  "rgb(164, 135, 190)",
                  "rgb(164, 135, 190)",
                  "rgb(255, 217, 144)",
                  "rgb(255, 217, 144)",
                  "rgb(207, 215, 212)",
                  "rgb(207, 215, 212)",
                  "rgb(207, 215, 212)",
                  "rgb(88, 128, 117)",
                  "rgb(88, 128, 117)",
                  "rgb(88, 128, 117)"
                ],
                datalabels: {
                  labels: {
                    icon: {
                      listeners: {
                        click: (context, value = "icon") => {
                          // Receives `click` events only for labels of the first dataset.
                          // The clicked label index is available in `context.dataIndex`.
                          console.log(
                            "label " +
                              context.dataIndex +
                              " has been clicked!" +
                              value
                          );
                        }
                      },
                      font: {
                        family: "FontAwesome",
                        size: 20,
                        weight: "bold"
                      },
                      fill: false,
                      align: "start",
                      color: "#fff",
                      anchor: "end",
                      borderColor: "#eee",
                      textShadow: true,
                      //borderWidth: 1,
                      offset: 6,
                      formatter: (value, ctx) =>
                        ctx.active ? "index" : "\uf055",
                      opacity: function(ctx) {
                        return ctx.active ? 1 : 0.5;
                      }
                    },
                    name: {
                      listeners: {
                        click: (context, value = "title") => {
                          // Receives `click` events only for labels of the first dataset.
                          // The clicked label index is available in `context.dataIndex`.
                          console.log(
                            "label " +
                              context.dataIndex +
                              " has been clicked!" +
                              value
                          );
                        }
                      },
                      color: "#fff",

                      //  align: "middle",
                      font: { size: 11, weight: "bold" },
                      formatter: (value, ctx) => {
                        return ctx.active
                          ? "name"
                          : ctx.dataset.labels[ctx.dataIndex]
                              .split(" ")
                              .join("\n");
                      }
                    }
                  }
                },
                borderColor: ["rgba(255, 255, 255)"],
                borderWidth: 4
              },
              {
                data: [8.3, 11.5, 5.2, 12, 5.1, 8, 8],
                datalabels: {
                  labels: {
                    icon: {
                      fill: false,
                      align: "end",
                      color: "#fff",
                      anchor: "center",
                      borderColor: "#eee",
                      textShadow: true,
                      font: {
                        family: "FontAwesome",
                        size: 20,
                        weight: "bold"
                      },
                      listeners: {
                        click: (context, value = "icon") => {
                          // Receives `click` events only for labels of the first dataset.
                          // The clicked label index is available in `context.dataIndex`.

                          console.log(
                            "label " +
                              context.dataIndex +
                              " has been clicked!" +
                              value
                          );
                        }
                      },
                      formatter: (value, ctx) =>
                        ctx.active ? "index" : "\uf055",
                      offset: 22,
                      opacity: ctx => (ctx.active ? 1 : 0.5)
                    },
                    name: {
                      color: "#fff",
                      textAlign: "left",
                      align: "middle",
                      font: { size: 11, weight: "bold" },
                      listeners: {
                        click: (context, value = "title") => {
                          // Receives `click` events only for labels of the first dataset.
                          // The clicked label index is available in `context.dataIndex`.
                          console.log(
                            "label " +
                              context.dataIndex +
                              " has been clicked!" +
                              value
                          );
                        }
                      },
                      formatter: (value, ctx) => {
                        return ctx.active
                          ? "name"
                          : ctx.dataset.labels[ctx.dataIndex]
                              .split(" ")
                              .join("\n");
                      }
                    }
                  }
                },
                backgroundColor: [
                  "rgba(255, 203, 102, 0.7)",
                  "rgba(126, 203, 190, 0.7)",
                  "rgba(213,135, 143, 0.7)",
                  "rgba(164, 135, 190, 0.7)",
                  "rgba(255, 217, 144, 0.7)",
                  "rgba(207, 215, 212, 0.7)",
                  "rgba(88, 128, 117, 0.7)"
                ],
                labels: [
                  "IT/Technology",
                  "Business Services",
                  "Business Finance, Analytics& Reporting",
                  "Corporate Finance & Governance",
                  "Procurement",
                  "Property",
                  "Legal"
                ],

                borderColor: ["rgba(255, 255, 255)"],
                borderWidth: 4
              }
            ]
          },
          plugins: [ChartDataLabels],
          options: {
            responsive: true,
            cutoutPercentage: 30,
            datasetRadiusBuffer: 25,
            segmentShowStroke: true,
            segmentStrokeColor: "#fff",

            segmentStrokeWidth: 2,

            events: ["click"],
            legend: {
              display: false
            },
            tooltips: {
              displayColors: false,
              callbacks: {
                label: (tooltipItem: any, data: any) => {
                  const dataset = data.datasets[tooltipItem.datasetIndex];
                  const index = tooltipItem.index;
                  return dataset.labels[index];
                }
              }
            },
            plugins: {
              datalabels: {
                // listeners: {
                //   click: function(context) {
                //     // Receives `enter` events for any labels of any dataset. Indices of the
                //     // clicked label are: `context.datasetIndex` and `context.dataIndex`.
                //     // For example, we can modify keep track of the hovered state and
                //     // return `true` to update the label and re-render the chart.
                //     context.hovered = true;
                //     console.log("click", context);
                //     return true;
                //   },
                //   leave: function(context) {
                //     // Receives `leave` events for any labels of any dataset.
                //     console.log(" leave");
                //     context.hovered = false;
                //     return true;
                //   }
                // }
                // display: function(context) {
                //   return context.dataset.labels[context.dataIndex];
                //   //return "\uf055";
                //   // return context.dataIndex % 2; // display labels with an odd index
                // },
                // formatter: function(value, context) {
                //   return "\uf055";
                //   //   return context.dataset.labels[context.dataIndex]
                //   //     .split(" ")
                //   //     .join("\n");
                // }
                // labels: {
                //   icon: "\uf055"
                // }
                // formatter: function(value, context) {
                //   console.log(context.chart.data.labels[context.dataIndex]);
                //   //context.dataset.labels[context.dataIndex].split(" ").join("\n")
                //   return context.dataset.labels[context.dataIndex]
                //     .split(" ")
                //     .join("\n");
                // }
              }
            }

            // plugins: {
            //   labels: [
            //     {
            //       fontColor: "#fff",
            //       textMargin: -7,
            //       textShadow: true,
            //       fontFamily: "FontAwesome",
            //       fontSize: 19,
            //       borderColor: "#eee",
            //       border: 1,

            //       render: () => "\uf055",
            //       click: e => {
            //         alert(e);
            //       },
            //       position: "outside"
            //     },
            //     {
            //       textMargin: 4,
            //       textShadow: true,
            //       fontColor: "#fff",
            //       onClick: e => {
            //         alert(e);
            //       },
            //       render: (args: any) =>
            //         args.dataset.labels[args.index].split(" ").join("\n")
            //     }
            //   ]
            // }
          }
        } as any)
      );
    }
  }, [ctx]);

  return (
    <div className="canvasContainer">
      <canvas id="wheel" width="400" height="400" ref={canvasRef} />
      <div style={{ display: "none" }}>
        <img
          id="source"
          src="https://downergroup.sharepoint.com/:i:/r/sites/NZCFO/SiteAssets/Images/Downer-Group-Logo.png?csf=1&e=bR4jRq"
          width="200"
          height="110"
        />
      </div>

      {contextualMenuDialog && (
        <Callout
          gapSpace={0}
          target={canvasRef.current}
          onDismiss={() => setContextualMenuDialog(false)}
          setInitialFocus={true}
          isBeakVisible={false}
          directionalHint={directionalHint}
        >
          Test
        </Callout>
      )}
    </div>
  );
};

// <div classNameNameName={ styles.menuWheel }>
// <div classNameNameName={ styles.container }>
//   <div classNameNameName={ styles.row }>
//     <div classNameNameName={ styles.column }>
//       <span classNameNameName={ styles.title }>Welcome to SharePoint!</span>
//       <p classNameNameName={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
//       <p classNameNameName={ styles.description }>{escape(this.props.description)}</p>
//       <a href="https://aka.ms/spfx" classNameNameName={ styles.button }>
//         <span classNameNameName={ styles.label }>Learn more</span>
//       </a>
//     </div>
//   </div>
// </div>
// </div>
