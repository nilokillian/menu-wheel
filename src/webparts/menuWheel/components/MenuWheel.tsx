import * as React from "react";
import * as ReactDOM from "react";
import { IMenuWheelProps } from "./IMenuWheelProps";
import * as Chart from "chart.js";
import "chartjs-plugin-labels";
import { initializeIcons } from "@uifabric/icons";
import { FaBeer } from "react-icons/fa";

const logo: HTMLImageElement = require("../images/Downer-Group-Logo.png");

export const MenuWheel: React.FC<IMenuWheelProps> = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>();
  const [ctx, setCtx] = React.useState();
  const [menu, setMenu] = React.useState();
  initializeIcons();
  // React.useEffect(() => {
  //   initializeIcons();
  // }, []);

  React.useEffect(() => {
    if (canvasRef) {
      setCtx(canvasRef.current.getContext("2d"));
    }
  }, [canvasRef]);

  React.useEffect(() => {
    if (menu) {
      Chart.pluginService.register({
        beforeDraw: function(chart) {
          var width = chart.width,
            height = chart.height,
            ctx = chart.ctx;

          ctx.restore();
          var fontSize = (height / 114).toFixed(2);
          ctx.font = fontSize + "em sans-serif";
          ctx.textBaseline = "middle";

          // var text = "75%",
          //   textX = Math.round((width - ctx.measureText(text).width) / 2),
          //   textY = height / 2;

          const image: any = document.getElementById("source");

          let imageX = Math.round((width - ctx.measureText(image).width) / 2);
          let imageY = height / 2;
          console.log("imageY", imageY);
          // ctx.fillText(text, textX, textY);
          ctx.drawImage(image, 280, imageY - 55, 200, 110);
          ctx.save();
        }
      });

      canvasRef.current.onclick = evt => {
        var activePoints = menu.getElementsAtEvent(evt);

        var chartData = activePoints[0]["_chart"].config.data;
        var idx = activePoints[0]["_index"];

        var label = chartData.labels[idx];
        var value = chartData.datasets[0].data[idx];

        console.log("datasets[0]", chartData.datasets[0]);
      };

      console.log("menu", menu);
    }
  }, [menu]);

  React.useEffect(() => {
    if (ctx)
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
                spanGaps: true,
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
                borderColor: ["rgba(255, 255, 255)"],
                borderWidth: 7
              },
              {
                data: [8.2, 11.4, 5, 12, 5, 8, 8],
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
                  "Business Finance, Analytics & Reporting",
                  "Corporate Finance & Governance",
                  "Procurement",
                  "Property",
                  "Legal"
                ],
                borderColor: ["rgba(255, 255, 255)"],
                borderWidth: 7
              }
            ]
          },
          options: {
            responsive: true,
            cutoutPercentage: 30,
            legend: {
              display: false
            },
            tooltips: {
              callbacks: {
                label: (tooltipItem: any, data: any) => {
                  const dataset = data.datasets[tooltipItem.datasetIndex];
                  const index = tooltipItem.index;
                  return dataset.labels[index];
                }
              }
            },

            plugins: {
              labels: {
                fontColor: "#fff",
                textShadow: true,
                textMargin: 4,
                render: (args: any) => {
                  return {
                    src:
                      "https://img.icons8.com/ios-filled/50/000000/cloudflare.png",
                    width: 16,
                    height: 16
                  };

                  //return args.dataset.labels[args.index].split(" ").join("\n");
                }
              }
            }
          }
        } as any)
      );
  }, [ctx]);

  return (
    <div className="canvasContainer">
      <canvas id="wheel" width="400" height="400" ref={canvasRef} />
      <div style={{ display: "none" }}>
        <img
          id="source"
          src="https://downergroup.sharepoint.com/:i:/r/sites/NZCFO/SiteAssets/Images/Downer-Group-Logo.png?csf=1&e=bR4jRq"
          width="200"
          height="100"
        />
      </div>
      <div
        style={{
          height: 150,
          width: 150,
          backgroundColor: "#bbb",
          borderRadius: "50%",
          display: "inline-block"
        }}
      ></div>
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
