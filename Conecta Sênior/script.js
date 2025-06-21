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

async function gerarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Coleta de dados do formulário
  const nome = document.getElementById("nome").value;
  const medicamento = document.getElementById("medicamento").value;
  const atividade = document.getElementById("atividade").value;
  const horario = document.getElementById("horario").value;
  const idade = document.getElementById("idade").value;

  // Cabeçalho
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Ficha do Idoso", 10, 15);

  // Dados do idoso
  doc.setFont("Helvetica", "normal");
  doc.setFontSize(12);
  doc.text(`Nome: ${nome}`, 10, 25);
  doc.text(`Idade: ${idade}`, 10, 30);
  doc.text(`Atividade: ${atividade}`, 10, 35);

  // --- ROTINA DO DIA ---
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Rotina do Dia", 105, 45, { align: "center" });

  doc.setDrawColor(164, 42, 42);
  doc.setLineWidth(0.8);
  doc.line(20, 47, 190, 47); // linha marrom decorativa abaixo do título

  const rotinaData = [
    ["Medicamento", medicamento || "-"],
    ["Horário", horario || "-"]
  ];

  doc.autoTable({
    body: rotinaData,
    startY: 50,
    theme: "striped",
    styles: {
      font: "helvetica",
      halign: "left"
    },
    didParseCell: function (data) {
      data.cell.styles.fillColor = [255, 255, 255]; // fundo branco nas células
    }
  });

  // --- MEDICAMENTOS DO DIA ---
  const yPos = doc.lastAutoTable.finalY + 10;
  const inputs = document.querySelectorAll("#lista-medicamentos input");
  const medicamentos = [];

  inputs.forEach((input, i) => {
    medicamentos.push([`Medicamento ${i + 1}`, input.value || "-"]);
  });

  doc.setFont("Helvetica", "bold");
  doc.text("Medicamentos do Dia", 105, yPos, { align: "center" });

  doc.setDrawColor(164, 42, 42);
  doc.setLineWidth(0.8);
  doc.line(20, yPos + 2, 190, yPos + 2);

  doc.autoTable({
    body: medicamentos,
    startY: yPos + 5,
    theme: "striped",
    styles: {
      font: "helvetica",
      halign: "left"
    },
    didParseCell: function (data) {
      data.cell.styles.fillColor = [255, 255, 255];
    }
  });

  // Rodapé com autoria
  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(10);
  doc.setFont("Helvetica", "italic");
  doc.text(
    "Projeto desenvolvido por: Jennifer da Silva Guedes - RA: 244457.",
    10,
    pageHeight - 20
  );

  doc.save("Ficha_Idoso.pdf");
}
