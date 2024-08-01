document.addEventListener("DOMContentLoaded", function () {
  // jsPDF'yi global olarak kullan
  const jsPDF = window.jspdf.jsPDF;
  const jsPDFAutotable = window.jspdf.jsPDFAutotable;
  const sheetJs = window.sheetJs;

  const btn = document.getElementById("btn-click");
  const pdfTable = document.querySelector("#pdf-table");
  const pdfHeader = document.querySelector("#pdf-header >tr").children;

  console.log(pdfTable);
  console.log(pdfHeader);

  btn.addEventListener("click", () => {
    const doc = new jsPDF();
    doc.autoTable({
      html: "#pdf-table",
      headStyles: { fillColor: [236, 28, 36], textColor: [255, 250, 250] },
      styles: {
        font: "BebasNeue", // Özel fontu kullan
      },
    });

    for (let i = 0; i < pdfTable.rows.length; i++) {
      for (let j = 0; j < pdfTable.rows[i].cells.length; j++) {
        console.log(pdfTable.rows[i].cells[j].innerHTML);
      }
    }
    doc.autoPrint({ variant: "non-conform" });
    doc.save("a4.pdf");
  });

  excelBtn.addEventListener("click", () => {
    const fileName = "excel.xls";
    const wb = new sheetJs.Workbook();
    const ws = sheetJs.utils.table_to_sheet(pdfTable);
    wb.SheetNames.push("Sheet1");
    wb.Sheets["Sheet1"] = ws;
    const wbout = sheetJs.write(wb, {
      bookType: "xls",
      bookSST: true,
      type: "binary",
    });
    function s2ab(s) {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    }
    saveAs(
      new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
      fileName
    );
  });
});
