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

  // Coletando os dados do formulário
  const nome = document.getElementById("nome").value;
  const medicamento = document.getElementById("medicamento").value;
  const atividade = document.getElementById("atividade").value;
  const horario = document.getElementById("horario").value;
  const idade = document.getElementById("idade").value;

  // Cabeçalho do PDF
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Ficha do Idoso", 10, 15);

  // Dados do idoso
  doc.setFont("Helvetica", "normal");
  doc.setFontSize(12);
  doc.text(`Nome: ${nome}`, 10, 25);
  doc.text(`Idade: ${idade}`, 10, 30);
  doc.text(`Atividade: ${atividade}`, 10, 35);

  // Título da seção: Rotina do Dia
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Rotina do Dia", 105, 45, { align: "center" });

  // Tabela de rotina
  const rotinaData = [
    ["Medicamento", medicamento || "-"],
    ["Horário", horario || "-"]
  ];

  doc.autoTable({
    head: [["Item", "Detalhes"]],
    body: rotinaData,
    startY: 50,
    theme: "striped",
    headStyles: {
      fillColor: [165, 42, 42],
      textColor: 255,
      halign: "center"
    }
  });

  // Captura os medicamentos adicionais
  const yPos = doc.lastAutoTable.finalY + 10;
  const inputs = document.querySelectorAll("#lista-medicamentos input");
  const medicamentos = [];

  inputs.forEach((input, i) => {
    medicamentos.push([`Medicamento ${i + 1}`, input.value || "-"]);
  });

  // Título da seção: Medicamentos do Dia
  doc.setFont("Helvetica", "bold");
  doc.text("Medicamentos do Dia", 105, yPos, { align: "center" });

  // Tabela de medicamentos
  doc.autoTable({
    head: [["Item", "Nome do Medicamento"]],
    body: medicamentos,
    startY: yPos + 5,
    theme: "striped",
    headStyles: {
      fillColor: [165, 42, 42],
      textColor: 255,
      halign: "center"
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

  // Salva o PDF
  doc.save("Ficha_Idoso.pdf");
}
