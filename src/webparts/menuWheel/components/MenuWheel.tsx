import * as React from "react";
import { IMenuWheelProps } from "./IMenuWheelProps";
import * as Chart from "chart.js";
import "chartjs-plugin-labels";

export const MenuWheel: React.FC<IMenuWheelProps> = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>();
  const [ctx, setCtx] = React.useState();
  const [menu, setMenu] = React.useState();

  React.useEffect(() => {
    if (canvasRef) {
      setCtx(canvasRef.current.getContext("2d"));
    }
  }, [canvasRef]);

  React.useEffect(() => {
    if (menu) {
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
            // labels: [
            //   "IT/Technology",
            //   "Business Services",
            //   "Business Finance, Analytics & Reporting",
            //   "Corporate Finance & Governance",
            //   "Procurement",
            //   "Property",
            //   "Legal"
            // ],
            datasets: [
              {
                data: [
                  5,
                  5,
                  5,

                  5,
                  5,
                  5,
                  5,
                  5,

                  6,
                  6,

                  5,
                  5,
                  5,
                  5,
                  5,

                  8,
                  8,
                  6,
                  6,
                  6,
                  6,
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

                  "Tenders/Contract Reviews", // "Legal"
                  `Contract Execution (DPA's)`, // "Legal"
                  "Bonds/Insurance" // "Legal"
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
                data: [7, 11, 6, 10, 8, 8, 8],
                backgroundColor: [
                  "rgb(255, 203, 102)",
                  "rgb(126, 203, 190)",
                  "rgb(213,135, 143)",
                  "rgb(164, 135, 190)",
                  "rgb(255, 217, 144)",
                  "rgb(207, 215, 212)",
                  "rgb(88, 128, 117)"
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
            legend: {
              display: false
            },
            tooltips: {
              callbacks: {
                label: (tooltipItem: any, data: any) => {
                  var dataset = data.datasets[tooltipItem.datasetIndex];
                  var index = tooltipItem.index;
                  return dataset.labels[index] + ": " + dataset.data[index];
                }
              }
            },

            plugins: {
              // labels: {
              //   render: "label",
              //   arc: true,
              //   position: "border",
              //   fontSize: 12,
              //   fontColor: "#fff",
              //   textShadow: true
              // }
              labels: {
                render: function(args) {
                  console.log("args", args);

                  //return args.dataset.labels;

                  //return "$" + args.value;
                },
                arc: true
              }
              // datalabels: {
              //   color: "#111",
              //   textAlign: "center",
              //   font: {
              //     lineHeight: 1.6
              //   },
              //   formatter: function(value, ctx) {
              //     console.log("value", value);
              //     // console.log("value");
              //     // console.log("value");
              //     return (
              //       ctx.chart.data.labels[ctx.dataIndex] + "\n" + value + "%"
              //     );
              //   }
              // }
            }
          }
        } as any)
      );
  }, [ctx]);

  return <canvas id="wheel" width="400" height="400" ref={canvasRef} />;

  // <div>
  //   <input
  //     type="radio"
  //     name="opt"
  //     id="ococonut"
  //     className="menuopt ococonut"
  //   />
  //   <input
  //     type="radio"
  //     name="opt"
  //     id="ovanilla"
  //     className="menuopt ovanilla"
  //   />
  //   <input type="radio" name="opt" id="oorange" className="menuopt oorange" />
  //   {/* <input type="radio" name="opt" id="oalmond" className="menuopt oalmond" /> */}
  //   <input type="radio" name="opt" id="ogrape" className="menuopt ogrape" />
  //   <input
  //     type="radio"
  //     name="opt"
  //     id="oblackberry"
  //     className="menuopt oblackberry"
  //   />
  //   <input type="radio" name="opt" id="ocherry" className="menuopt ocherry" />
  //   <input
  //     type="radio"
  //     name="opt"
  //     id="ostrawberry"
  //     className="menuopt ostrawberry"
  //   />
  //   <input
  //     type="radio"
  //     name="opt"
  //     id="oraspberry"
  //     className="menuopt oraspberry"
  //   />
  //   <input type="radio" name="opt" id="unsel" className="menuopt" checked />
  //   <nav>
  //     <ul className="circle">
  //       <li className="coconut light slice">
  //         <label className="circle">Coconut</label>
  //       </li>
  //       <li className="vanilla light slice">
  //         <label className="circle">Vanilla</label>
  //       </li>
  //       <li className="orange light slice">
  //         <label className="circle">Orange</label>
  //       </li>
  //       {/* <li className="almond light slice">
  //         <label className="circle">Almond</label>
  //       </li> */}
  //       <li className="grape light slice">
  //         <label className="circle">Grape</label>
  //       </li>
  //       <li className="blackberry dark slice">
  //         <label className="circle">Blackberry</label>
  //       </li>
  //       <li className="cherry dark slice">
  //         <label className="circle">Cherry</label>
  //       </li>
  //       <li className="strawberry dark slice">
  //         <label className="circle">Strawberry</label>
  //       </li>
  //       <li className="raspberry light slice">
  //         <label className="circle">Raspberry</label>
  //       </li>

  //       <ul className="unsel circle">
  //         <li className="raspberry light slice">
  //           <label className="circle">Raspberry</label>
  //         </li>

  //         <li className="unsel circle"> </li>
  //       </ul>
  //     </ul>
  //   </nav>
  // </div>

  // const anchorRef = React.useRef<HTMLAnchorElement>();

  // const inputRef = React.useRef<HTMLInputElement>();

  // //const canvasRef = React.useRef<HTMLCanvasElement>();

  // const [canvasRef, setCanvasRef] = React.useState<HTMLCanvasElement>();
  // //<CanvasRenderingContext2D>
  // const [ctx, setCtx] = React.useState();
  // const [link, setLink] = React.useState<string>("");
  // const [inputValue, setInputValue] = React.useState<string>("");

  // const update = (E?: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
  //   ctx.clearRect(0, 0, 224, 224);
  //   let mx = 0;
  //   let my = 0;
  //   if (!E) {
  //     console.log(E);
  //     mx = 112;
  //     my = 112;
  //   } else {
  //     console.log("E.pageX ", E.pageX);
  //     mx = E.clientX;
  //     my = E.clientY;
  //   }

  //   let mangle =
  //     (-Math.atan2(mx - 112, my - 112) + Math.PI * 2.5) % (Math.PI * 2);

  //   let mradius = Math.sqrt(Math.pow(mx - 112, 2) + Math.pow(my - 112, 2));
  //   console.log("mradius ", mradius);
  //   console.log("mangle ", mangle);
  //   inputRef.current.value = "Not over any region";
  //   //setInputValue("Not over any region");
  //   anchorRef.current.setAttribute("href", "");
  //   //setLink("");
  //   for (let i = 0; i < 8; i++) {
  //     let angle = -Math.PI / 8 + i * (Math.PI / 4);
  //     // prettier-ignore
  //     if (((mangle > angle && mangle < (angle + Math.PI / 4)) || (mangle > Math.PI*15/8 && i==0)) && mradius<=112 && mradius>=69) {
  //       console.log("angle", angle);
  //       ctx.fillStyle = "#5a5a5a";

  //       inputRef.current.value = "In region " + i;
  //       anchorRef.current.setAttribute("href", "#" + i);
  //       //setInputValue("In region " + i);
  //       // setLink("#" + i);
  //     } else {
  //       console.log("else");
  //      ctx.fillStyle = "#4c4c4c";

  //     }

  //     ctx.beginPath();
  //     ctx.moveTo(112, 112);
  //     //  ctx.lineTo(112 + Math.cos(angle) * 112, 112 + Math.sin(angle) * 112);
  //     ctx.arc(112, 112, 112, angle, angle + Math.PI / 4, false);
  //     ctx.lineTo(112, 112);
  //     ctx.fill();
  //   }

  //   ctx.fillStyle = "#f2f2f2";
  //   ctx.beginPath();
  //   ctx.arc(112, 112, 69, 0, 2 * Math.PI, false);
  //   ctx.fill();
  //   ctxCallBack();
  // };

  // const ctxCallBack = React.useCallback(() => {
  //   setCtx(ctx);
  // }, [ctx]);

  // // React.useEffect(() => {
  // //   if (ctx) update(false);
  // // }, []);

  // React.useEffect(() => {
  //   if (canvasRef) {
  //     setCtx(canvasRef.getContext("2d"));
  //   }
  //   // if (canvasRef)
  // }, [canvasRef]);

  // React.useEffect(() => {
  //   if (ctx) update();
  // }, [ctx]);

  // return (
  //   // <div classNameNameName={styles.menuWheel}>
  //   <div className={styles.container}>
  //     <a id="link" ref={anchorRef} href={link}>
  //       <canvas
  //         ref={setCanvasRef}
  //         id="c"
  //         width="224"
  //         height="224"
  //         onMouseMove={e => update(e)}
  //         onMouseOut={() => update()}
  //         style={{ width: 224, height: 224 }}
  //       />
  //     </a>
  //     <input ref={inputRef} id="i" value={inputValue} />
  //   </div>
  //   //   </div>
  // );
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
