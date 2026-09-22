import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface ModuleScore {
  latihan: number | null;
  lab: number | null;
}

interface Student {
  id: string;
  username: string;
  name: string;
  kelas: string;
  modulesTaken: number;
  scoreS1: number;
  scoreS2: number;
  moduleScores: Record<string, ModuleScore>;
  isActive: boolean;
}

function formatScore(val: number | null): string {
  return val !== null ? String(val) : '-';
}

export function exportStudentPDF(student: Student) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header
  doc.setFillColor(30, 41, 59); // slate-800
  doc.rect(0, 0, pageWidth, 40, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Laporan Nilai Siswa', 14, 18);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('LMS Koding & Kecerdasan Artifisial (KKA)', 14, 26);
  doc.setFontSize(8);
  doc.text(`Dicetak: ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`, 14, 33);

  // Student Info
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Data Siswa', 14, 52);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Nama Lengkap  : ${student.name}`, 14, 60);
  doc.text(`Username        : @${student.username}`, 14, 66);
  doc.text(`Kelas              : ${student.kelas}`, 14, 72);
  doc.text(`Modul Selesai  : ${student.modulesTaken} / 24 (${Math.round((student.modulesTaken / 24) * 100)}%)`, 14, 78);

  // Progress bar visual
  const barX = 14;
  const barY = 82;
  const barW = pageWidth - 28;
  const barH = 4;
  const pct = student.modulesTaken / 24;
  doc.setFillColor(226, 232, 240); // slate-200
  doc.roundedRect(barX, barY, barW, barH, 2, 2, 'F');
  if (pct > 0) {
    doc.setFillColor(pct >= 1 ? 16 : 99, pct >= 1 ? 185 : 102, pct >= 1 ? 129 : 241); // emerald or indigo
    doc.roundedRect(barX, barY, barW * pct, barH, 2, 2, 'F');
  }

  // Semester 1 Table
  let startY = 94;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(67, 56, 202); // indigo-600
  doc.text(`Semester 1 — Rata-rata: ${student.scoreS1 > 0 ? student.scoreS1 : '-'}`, 14, startY);

  const s1Headers = [['Pertemuan', 'Latihan', 'Lab']];
  const s1Rows: any[] = [];
  for (let i = 1; i <= 12; i++) {
    const key = `s1-p${i}`;
    const ms = student.moduleScores[key];
    s1Rows.push([
      `Pertemuan ${i}`,
      formatScore(ms?.latihan),
      formatScore(ms?.lab)
    ]);
  }

  autoTable(doc, {
    head: s1Headers,
    body: s1Rows,
    startY: startY + 3,
    margin: { left: 14, right: 14 },
    styles: { fontSize: 9, cellPadding: 3 },
    headStyles: { fillColor: [67, 56, 202], textColor: 255, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [245, 247, 250] },
    columnStyles: {
      0: { cellWidth: 50 },
      1: { halign: 'center', cellWidth: 40 },
      2: { halign: 'center', cellWidth: 40 },
    },
    didParseCell: function (data: any) {
      if (data.section === 'body' && (data.column.index === 1 || data.column.index === 2)) {
        const val = parseInt(data.cell.raw);
        if (!isNaN(val)) {
          if (val >= 75) {
            data.cell.styles.textColor = [5, 150, 105]; // emerald
            data.cell.styles.fontStyle = 'bold';
          } else if (val > 0) {
            data.cell.styles.textColor = [217, 119, 6]; // amber
            data.cell.styles.fontStyle = 'bold';
          } else {
            data.cell.styles.textColor = [239, 68, 68]; // red
          }
        }
      }
    }
  });

  // Semester 2 Table
  const s2StartY = (doc as any).lastAutoTable.finalY + 10;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(124, 58, 237); // purple-600
  doc.text(`Semester 2 — Rata-rata: ${student.scoreS2 > 0 ? student.scoreS2 : '-'}`, 14, s2StartY);

  const s2Headers = [['Pertemuan', 'Latihan', 'Lab']];
  const s2Rows: any[] = [];
  for (let i = 1; i <= 12; i++) {
    const key = `s2-p${i}`;
    const ms = student.moduleScores[key];
    s2Rows.push([
      `Pertemuan ${i}`,
      formatScore(ms?.latihan),
      formatScore(ms?.lab)
    ]);
  }

  autoTable(doc, {
    head: s2Headers,
    body: s2Rows,
    startY: s2StartY + 3,
    margin: { left: 14, right: 14 },
    styles: { fontSize: 9, cellPadding: 3 },
    headStyles: { fillColor: [124, 58, 237], textColor: 255, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [245, 243, 255] },
    columnStyles: {
      0: { cellWidth: 50 },
      1: { halign: 'center', cellWidth: 40 },
      2: { halign: 'center', cellWidth: 40 },
    },
    didParseCell: function (data: any) {
      if (data.section === 'body' && (data.column.index === 1 || data.column.index === 2)) {
        const val = parseInt(data.cell.raw);
        if (!isNaN(val)) {
          if (val >= 75) {
            data.cell.styles.textColor = [5, 150, 105];
            data.cell.styles.fontStyle = 'bold';
          } else if (val > 0) {
            data.cell.styles.textColor = [217, 119, 6];
          } else {
            data.cell.styles.textColor = [239, 68, 68];
          }
        }
      }
    }
  });

  // Footer
  const finalY = (doc as any).lastAutoTable.finalY + 15;
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text('Dokumen ini dihasilkan secara otomatis oleh LMS KKA.', 14, finalY);

  doc.save(`Nilai_${student.name.replace(/\s+/g, '_')}_${student.kelas.replace(/\s+/g, '_')}.pdf`);
}

export function exportClassPDF(students: Student[], className?: string) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header
  doc.setFillColor(30, 41, 59);
  doc.rect(0, 0, pageWidth, 35, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  const title = className && className !== 'Semua Kelas' ? `Rekap Nilai Kelas ${className} — LMS KKA` : 'Rekap Nilai Seluruh Kelas — LMS KKA';
  doc.text(title, 14, 16);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Total Siswa: ${students.length}  |  Dicetak: ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}`, 14, 24);

  // Summary Table
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Ringkasan Nilai Siswa', 14, 44);

  const summaryHeaders = [['No', 'Nama Siswa', 'Kelas', 'Modul', 'Rata S1', 'Rata S2', 'Status']];
  const summaryRows = students.map((s, i) => {
    let status = 'Belum Ada Nilai';
    if (s.scoreS1 >= 75 || s.scoreS2 >= 75) status = 'Lulus KKM';
    else if (s.scoreS1 > 0 || s.scoreS2 > 0) status = 'Remedial';
    return [
      String(i + 1),
      s.name,
      s.kelas,
      `${s.modulesTaken}/24`,
      s.scoreS1 > 0 ? String(s.scoreS1) : '-',
      s.scoreS2 > 0 ? String(s.scoreS2) : '-',
      status
    ];
  });

  autoTable(doc, {
    head: summaryHeaders,
    body: summaryRows,
    startY: 47,
    margin: { left: 14, right: 14 },
    styles: { fontSize: 8, cellPadding: 3 },
    headStyles: { fillColor: [30, 41, 59], textColor: 255, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    columnStyles: {
      0: { cellWidth: 10, halign: 'center' },
      1: { cellWidth: 50 },
      2: { cellWidth: 20, halign: 'center' },
      3: { cellWidth: 20, halign: 'center' },
      4: { cellWidth: 18, halign: 'center' },
      5: { cellWidth: 18, halign: 'center' },
      6: { halign: 'center' },
    },
    didParseCell: function (data: any) {
      if (data.section === 'body') {
        if (data.column.index === 4 || data.column.index === 5) {
          const val = parseInt(data.cell.raw);
          if (!isNaN(val)) {
            if (val >= 75) { data.cell.styles.textColor = [5, 150, 105]; data.cell.styles.fontStyle = 'bold'; }
            else if (val > 0) { data.cell.styles.textColor = [217, 119, 6]; data.cell.styles.fontStyle = 'bold'; }
          }
        }
        if (data.column.index === 6) {
          if (data.cell.raw === 'Lulus KKM') { data.cell.styles.textColor = [5, 150, 105]; data.cell.styles.fontStyle = 'bold'; }
          else if (data.cell.raw === 'Remedial') { data.cell.styles.textColor = [239, 68, 68]; data.cell.styles.fontStyle = 'bold'; }
        }
      }
    }
  });

  // Detail per student - each on a new page (portrait format)
  students.forEach((student, idx) => {
    doc.addPage('a4', 'portrait');

    // Mini header
    doc.setFillColor(30, 41, 59);
    doc.rect(0, 0, pageWidth, 28, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`Laporan Detail: ${student.name}`, 14, 14);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(`Username: @${student.username}  |  Kelas: ${student.kelas}  |  Modul Selesai: ${student.modulesTaken}/24`, 14, 21);

    // S1 Table
    doc.setTextColor(67, 56, 202);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(`Semester 1 — Rata-rata: ${student.scoreS1 > 0 ? student.scoreS1 : '-'}`, 14, 38);

    const s1Rows: any[] = [];
    for (let i = 1; i <= 12; i++) {
      const ms = student.moduleScores[`s1-p${i}`];
      s1Rows.push([`Pertemuan ${i}`, formatScore(ms?.latihan), formatScore(ms?.lab)]);
    }

    autoTable(doc, {
      head: [['Pertemuan', 'Latihan', 'Lab']],
      body: s1Rows,
      startY: 42,
      margin: { left: 14, right: 14 },
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: [67, 56, 202], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [245, 243, 255] },
      columnStyles: {
        0: { cellWidth: 50 },
        1: { halign: 'center', cellWidth: 40 },
        2: { halign: 'center', cellWidth: 40 },
      },
      didParseCell: function (data: any) {
        if (data.section === 'body' && (data.column.index === 1 || data.column.index === 2)) {
          const val = parseInt(data.cell.raw);
          if (!isNaN(val)) {
            if (val >= 75) { data.cell.styles.textColor = [5, 150, 105]; data.cell.styles.fontStyle = 'bold'; }
            else if (val > 0) { data.cell.styles.textColor = [217, 119, 6]; data.cell.styles.fontStyle = 'bold'; }
            else { data.cell.styles.textColor = [239, 68, 68]; }
          }
        }
      }
    });

    // S2 Table
    const s2StartY = (doc as any).lastAutoTable.finalY + 10;
    doc.setTextColor(124, 58, 237);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(`Semester 2 — Rata-rata: ${student.scoreS2 > 0 ? student.scoreS2 : '-'}`, 14, s2StartY);

    const s2Rows: any[] = [];
    for (let i = 1; i <= 12; i++) {
      const ms = student.moduleScores[`s2-p${i}`];
      s2Rows.push([`Pertemuan ${i}`, formatScore(ms?.latihan), formatScore(ms?.lab)]);
    }

    autoTable(doc, {
      head: [['Pertemuan', 'Latihan', 'Lab']],
      body: s2Rows,
      startY: s2StartY + 4,
      margin: { left: 14, right: 14 },
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: [124, 58, 237], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [245, 243, 255] },
      columnStyles: {
        0: { cellWidth: 50 },
        1: { halign: 'center', cellWidth: 40 },
        2: { halign: 'center', cellWidth: 40 },
      },
      didParseCell: function (data: any) {
        if (data.section === 'body' && (data.column.index === 1 || data.column.index === 2)) {
          const val = parseInt(data.cell.raw);
          if (!isNaN(val)) {
            if (val >= 75) { data.cell.styles.textColor = [5, 150, 105]; data.cell.styles.fontStyle = 'bold'; }
            else if (val > 0) { data.cell.styles.textColor = [217, 119, 6]; data.cell.styles.fontStyle = 'bold'; }
            else { data.cell.styles.textColor = [239, 68, 68]; }
          }
        }
      }
    });
  });

  const fileName = className && className !== 'Semua Kelas' ? `Rekap_Nilai_Kelas_${className.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf` : `Rekap_Nilai_Seluruh_Kelas_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
}
