const form = document.querySelector("form"),
  fileInput = document.querySelector(".file-input"),
  tableEl = document.querySelector(".container-table"),
  formWrapper = document.querySelector(".wrapper");
  const headerSection=document.querySelector(".table__header")
 let btnElement;
const fileReader = new FileReader();
form.addEventListener("click", () => {
  fileInput.click();
});
fileInput.onchange = ({ target }) => {
  let file = target.files[0];
  if (file) {
    formWrapper.classList.add("hidden");
    tableEl.classList.remove("hidden");
    fileReader.readAsText(file);
  }
};

fileReader.onload = (e) => {
  let text = e.target.result.split("\n");
  function btnOnClick() {
    let workbook = XLSX.read(e.target.result, {
      type: "binary",
    });
    XLSX.writeFile(workbook, "test.xlsx");
  }

  console.log(text);
  const tBody = document.querySelector("tbody");
  tBody.innerHTML = "";
  for (let i = 0; i < text.length-1; i++) {
    let currentText = text[i].split(",");
    let rows="";
    for (let j = 0; j < currentText.length; j++) {
      rows += `<td>${currentText[j]}</td>`;
    }
    let tr = ` <tr>
      ${rows}
     </tr>`;
    tBody.innerHTML += tr;
    
    
  }
  headerSection.innerHTML += `<button class="btn ">Download</button>`;
   btnElement = document.querySelector(".btn");
  btnElement.addEventListener("click", btnOnClick);
};


