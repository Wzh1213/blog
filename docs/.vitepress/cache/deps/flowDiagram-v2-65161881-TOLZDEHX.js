import {
  flowRendererV2,
  flowStyles
} from "./chunk-VG3MMVNO.js";
import "./chunk-G4DLYJP3.js";
import {
  flowDb,
  parser$1
} from "./chunk-UD7TUACO.js";
import "./chunk-YKWYJB33.js";
import "./chunk-7CHNQDF4.js";
import "./chunk-7RWIMX5N.js";
import "./chunk-SKG4V4PA.js";
import "./chunk-CGS76IXM.js";
import "./chunk-XP7M6FJS.js";
import "./chunk-UK7VC2L3.js";
import {
  setConfig
} from "./chunk-CU57FD2Q.js";
import "./chunk-UXIASGQL.js";

// node_modules/mermaid/dist/flowDiagram-v2-65161881.js
var diagram = {
  parser: parser$1,
  db: flowDb,
  renderer: flowRendererV2,
  styles: flowStyles,
  init: (cnf) => {
    if (!cnf.flowchart) {
      cnf.flowchart = {};
    }
    cnf.flowchart.arrowMarkerAbsolute = cnf.arrowMarkerAbsolute;
    setConfig({ flowchart: { arrowMarkerAbsolute: cnf.arrowMarkerAbsolute } });
    flowRendererV2.setConf(cnf.flowchart);
    flowDb.clear();
    flowDb.setGen("gen-2");
  }
};
export {
  diagram
};
//# sourceMappingURL=flowDiagram-v2-65161881-TOLZDEHX.js.map
