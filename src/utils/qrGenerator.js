const QRCode = require("qrcode");

async function generateQR(eventId) {
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
  const qrData = JSON.stringify({ eventId, expiresAt });
  return await QRCode.toDataURL(qrData); // base64 format
}

module.exports = { generateQR };
