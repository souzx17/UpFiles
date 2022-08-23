const form = document.querySelector("form"),
fileInput = document.querySelector(".file-input"),
progressArea = document.querySelector(".progress-area"),
uploadedArea = document.querySelector(".uploaded-area");

// evento de clique de formulário
form.addEventListener("click", () =>{
  fileInput.click();
});

fileInput.onchange = ({target})=>{
  let file = target.files[0]; //obtendo o arquivo [0] isso significa que se o usuário selecionou vários arquivos, obtenha apenas o primeiro
  if(file){
    let fileName = file.name; //pega o nome do arquivo
    if (fileName.length >= 12) { //if file name comprimento é maior que 12, divida-o.
      let splitName = fileName.split('.');
      fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
    }
    uploadFile(fileName); //chamando uploadFile com passando o nome do arquivo como argumento
  }
}

// file upload function
function uploadFile(name){
  let xhr = new XMLHttpRequest(); //criando novo objeto xhr (AJAX)
  xhr.open("POST", "php/upload.php"); //enviando solicitação de postagem para o URL especificado
  xhr.upload.addEventListener("progress", ({ loaded, total }) => { //evento de progresso de upload de arquivo
    let fileLoaded = Math.floor((loaded / total) * 100);  //obtendo porcentagem do tamanho do arquivo carregado
    let fileTotal = Math.floor(total / 1000); //obtendo o tamanho total do arquivo em KB a partir de bytes
    let fileSize;
    // se o tamanho do arquivo for menor que 1024, adicione apenas KB, caso contrário, converta este KB em MB
    (fileTotal < 1024) ? fileSize = fileTotal + " KB" : fileSize = (loaded / (1024*1024)).toFixed(2) + " MB";
    let progressHTML = `<li class="row">
                          <i class="fas fa-file-alt"></i>
                          <div class="content">
                            <div class="details">
                              <span class="name">${name} • Uploading</span>
                              <span class="percent">${fileLoaded}%</span>
                            </div>
                            <div class="progress-bar">
                              <div class="progress" style="width: ${fileLoaded}%"></div>
                            </div>
                          </div>
                        </li>`;
    // uploadedArea.innerHTML = ""; //descomente esta linha se você não quiser mostrar o histórico de uploads
    uploadedArea.classList.add("onprogress");
    progressArea.innerHTML = progressHTML;
    if(loaded == total){
      progressArea.innerHTML = "";
      let uploadedHTML = `<li class="row">
                            <div class="content upload">
                              <i class="fas fa-file-alt"></i>
                              <div class="details">
                                <span class="name">${name} • Carregado!</span>
                                <span class="size">${fileSize}</span>
                              </div>
                            </div>
                            <i class="fas fa-check"></i>
                          </li>`;
      uploadedArea.classList.remove("onprogress");
      // uploadedArea.innerHTML = uploadedHTML; //Remova essa linha para nao mostrar o historico de upload
      uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML); //Remova essa linha para nao mostrar o historico de upload
    }
  });
  let data = new FormData(form);
  xhr.send(data);
}
