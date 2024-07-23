function importAllSVG() {
  const r = require.context("../styles/svg-icons", false, /\.svg$/);

  const svgList = {};
  r.keys().forEach((key) => {
    r;
    const svgName = key.replace("./", "").replace(".svg", "");

    svgList[svgName] = r(key).default;
  });
  return svgList;
}

export default importAllSVG;