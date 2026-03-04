const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
const logger = require('./logger');

const generateReportPDF = async (reportData) => {
  try {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([612, 792]); // Letter size
    const { width, height } = page.getSize();

    // Add header
    page.drawText('MAZURI WASTE MANAGEMENT SYSTEM', {
      x: 50,
      y: height - 50,
      size: 20,
      color: rgb(0, 0, 0),
      maxWidth: width - 100
    });

    // Add report title
    page.drawText(`${reportData.reportType.toUpperCase()} REPORT`, {
      x: 50,
      y: height - 100,
      size: 16,
      color: rgb(0.5, 0.5, 0.5),
      maxWidth: width - 100
    });

    // Add report ID and date
    page.drawText(`Report ID: ${reportData.reportId}`, {
      x: 50,
      y: height - 150,
      size: 12,
      color: rgb(0, 0, 0)
    });

    page.drawText(`Generated: ${new Date().toLocaleDateString()}`, {
      x: 50,
      y: height - 170,
      size: 12,
      color: rgb(0, 0, 0)
    });

    // Add summary section
    page.drawText('SUMMARY', {
      x: 50,
      y: height - 220,
      size: 14,
      color: rgb(0, 0, 0),
      fontBold: true
    });

    let yPosition = height - 250;
    page.drawText(`Total Waste Collected: ${reportData.summary?.totalWasteCollected?.value || 0} ${reportData.summary?.totalWasteCollected?.unit || 'kg'}`, {
      x: 50,
      y: yPosition,
      size: 11,
      color: rgb(0, 0, 0)
    });

    yPosition -= 20;
    page.drawText(`Total Collections: ${reportData.summary?.totalCollections || 0}`, {
      x: 50,
      y: yPosition,
      size: 11,
      color: rgb(0, 0, 0)
    });

    yPosition -= 20;
    page.drawText(`Collectors Involved: ${reportData.summary?.collectorsInvolved || 0}`, {
      x: 50,
      y: yPosition,
      size: 11,
      color: rgb(0, 0, 0)
    });

    yPosition -= 20;
    page.drawText(`Vehicles Used: ${reportData.summary?.vehiclesUsed || 0}`, {
      x: 50,
      y: yPosition,
      size: 11,
      color: rgb(0, 0, 0)
    });

    // Add observations
    if (reportData.observations) {
      yPosition -= 40;
      page.drawText('OBSERVATIONS', {
        x: 50,
        y: yPosition,
        size: 14,
        color: rgb(0, 0, 0),
        fontBold: true
      });

      yPosition -= 20;
      const wrappedText = reportData.observations;
      page.drawText(wrappedText, {
        x: 50,
        y: yPosition,
        size: 11,
        color: rgb(0, 0, 0),
        maxWidth: width - 100
      });
    }

    // Add recommendations
    if (reportData.recommendations && reportData.recommendations.length > 0) {
      yPosition -= 40;
      page.drawText('RECOMMENDATIONS', {
        x: 50,
        y: yPosition,
        size: 14,
        color: rgb(0, 0, 0),
        fontBold: true
      });

      reportData.recommendations.forEach((rec, index) => {
        yPosition -= 20;
        page.drawText(`${index + 1}. ${rec}`, {
          x: 50,
          y: yPosition,
          size: 11,
          color: rgb(0, 0, 0),
          maxWidth: width - 100
        });
      });
    }

    // Add footer
    page.drawText('© 2026 Mazuri Waste Management System. All rights reserved.', {
      x: 50,
      y: 30,
      size: 10,
      color: rgb(0.5, 0.5, 0.5)
    });

    const pdfBytes = await pdfDoc.save();
    const fileName = `report_${reportData.reportId}_${Date.now()}.pdf`;
    const filePath = path.join(__dirname, '../reports', fileName);

    // Ensure reports directory exists
    const reportsDir = path.dirname(filePath);
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    fs.writeFileSync(filePath, pdfBytes);
    logger.info(`Report PDF generated: ${fileName}`);

    return {
      fileName,
      filePath,
      fileSize: pdfBytes.length
    };
  } catch (error) {
    logger.error(`Error generating PDF report: ${error.message}`);
    throw error;
  }
};

module.exports = {
  generateReportPDF
};
