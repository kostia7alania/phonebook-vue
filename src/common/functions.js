export const getGuid = () => Math.floor(Math.random()*100000000000)
export const compare = (a, b, key = 'name') => {
    if (a[key]&&a[key].toUpperCase() < b[key]&&b[key].toUpperCase()) return -1;
    if (a[key]&&a[key].toUpperCase() > b[key]&&b[key].toUpperCase()) return 1;
    return 0;
  }

  export const convertToCSV = objArray => {
    let rows = typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
    let  header = "";
    Object.keys(rows[0]).map(pr => (header += pr + ";"));

    let str = "";
    rows.forEach(row => {
        let line = "";
        let columns =
            typeof row !== "object" ? JSON.parse(row) : Object.values(row);
        columns.forEach(column => {
            if (line !== "") {
                line += ";";
            }
            if (typeof column === "object") {
                line += JSON.stringify(column);
            }  else {
                line += column;
            }
        });
        str += line + "\r\n";
    });
    return header + "\r\n" + str;
}