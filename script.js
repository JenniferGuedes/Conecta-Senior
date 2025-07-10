let contadorMedicamentos = 3;
let rotinasSalvas = [];

document.addEventListener("DOMContentLoaded", () => {
  // Referências de elementos
  const btnAddMedicamento = document.getElementById("btn-add-medicamento");
  const btnSalvarRotina = document.getElementById("btn-salvar-rotina");
  const btnGerarPDF = document.getElementById("btn-gerar-pdf");
  const listaMedicamentos = document.getElementById("lista-medicamentos");

  // Adicionar novo medicamento
  btnAddMedicamento.addEventListener("click", () => {
    const novo = document.createElement("div");
    novo.innerHTML = `
      <label for="medicamento${contadorMedicamentos}">Insira o Medicamento ${contadorMedicamentos}:</label>
      <input type="text" id="medicamento${contadorMedicamentos}" placeholder="Insira o Medicamento" />
    `;
    listaMedicamentos.appendChild(novo);
    contadorMedicamentos++;
  });

  // Salvar rotina personalizada
  btnSalvarRotina.addEventListener("click", () => {
    const nome = document.getElementById("nome").value || "-";
    const idade = document.getElementById("idade").value || "-";
    const medicamento = document.getElementById("medicamento").value || "-";
    const atividade = document.getElementById("atividade").value || "-";
    const horario = document.getElementById("horario").value || "-";

    const novaRotina = {
      nome,
      idade,
      medicamento,
      atividade,
      horario
    };

    rotinasSalvas.push(novaRotina);
    alert("✅ Rotina salva com sucesso!");
  });

  // Gerar PDF
  btnGerarPDF.addEventListener("click", async () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Ficha do Idoso", 105, 15, { align: "center" });

    let y = 25;

    rotinasSalvas.forEach((rotina, i) => {
      doc.setFontSize(12);
      doc.setFont("Helvetica", "bold");
      doc.text(`Rotina ${i + 1}`, 10, y);
      doc.setFont("Helvetica", "normal");

      const rotinaInfo = [
        ["Nome", rotina.nome],
        ["Idade", rotina.idade],
        ["Medicamento", rotina.medicamento],
        ["Atividade", rotina.atividade],
        ["Horário", rotina.horario]
      ];

      doc.autoTable({
        body: rotinaInfo,
        startY: y + 5,
        theme: "striped",
        styles: { font: "helvetica", fontSize: 11 },
        didParseCell: data => data.cell.styles.fillColor = [255, 255, 255]
      });

      y = doc.lastAutoTable.finalY + 10;
    });

    // Lista de medicamentos
    const medicamentos = [];
    const inputs = listaMedicamentos.querySelectorAll("input");
    inputs.forEach((input, i) => {
      medicamentos.push([`Medicamento ${i + 1}`, input.value || "-"]);
    });

    doc.setFont("Helvetica", "bold");
    doc.text("Lista de Medicamentos", 105, y, { align: "center" });
    doc.setDrawColor(164, 42, 42);
    doc.setLineWidth(0.8);
    doc.line(20, y + 2, 190, y + 2);

    doc.autoTable({
      body: medicamentos,
      startY: y + 5,
      theme: "striped",
      styles: { font: "helvetica", fontSize: 11 },
      didParseCell: data => data.cell.styles.fillColor = [255, 255, 255]
    });

    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(10).setFont("Helvetica", "italic");
    doc.text("Projeto desenvolvido por: Jennifer da Silva Guedes - RA: 244457.", 10, pageHeight - 15);

    doc.save("Ficha_Idoso.pdf");
  });
});
