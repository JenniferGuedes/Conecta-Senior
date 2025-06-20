//Adicionar Medicamentos
let contador = 3;

function adicionarMedicamento() {
  const lista = document.getElementById('lista-medicamentos');
  const novoDiv = document.createElement('div');
  novoDiv.innerHTML = `
    <label for="medicamento${contador}">Insira o Medicamento ${contador}:</label>
    <input type="text" placeholder="Insira o Medicamento">`;
  lista.appendChild(novoDiv);
  contador++;
}

//Gerar PDF
async function gerarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const nome = document.getElementById("nome").value;
  const medicamento = document.getElementById("medicamento").value;
  const atividade = document.getElementById("atividade").value;
  const horario = document.getElementById("horario").value;
  const idade = document.getElementById("idade").value;
  

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Ficha do Idoso", 10, 15);

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(12);
  doc.text(`Nome: ${nome}`, 10, 25);
  doc.text(`Idade: ${idade}`, 10, 29.5);

  const rotinaData = [
    ["Medicamento", medicamento || "-"],
    ["Atividade", atividade || "-"],
    ["Horário", horario || "-"]
  
  ];

  doc.autoTable({
    head: [["Rotina do Dia"]],
    body: rotinaData,
    startY: 30,
    theme: "striped",
    headStyles: {
        fillColor: [165, 42, 42],  
        textColor: 255,
        halign: "center"
                
  }
  });

  const yPos = doc.lastAutoTable.finalY + 10;
  const inputs = document.querySelectorAll("#lista-medicamentos input");
  const medicamentos = [];

  inputs.forEach((input, i) => {
    medicamentos.push([`Medicamento ${i + 1}`, input.value || "-"]);
  });

  doc.autoTable({
    head: [["Medicamentos do Dia"]],
    body: medicamentos,
    startY: yPos,
    theme: "striped",
    headStyles: {
        fillColor: [165, 42, 42],
        textColor: 255,
        halign: "center"
  }
  });

  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(10);
  doc.text("Projeto desenvolvido por: Jennifer da Silva Guedes - RA:244457.", 10, pageHeight - 20);

  doc.save("Ficha_Idoso.pdf");

}

