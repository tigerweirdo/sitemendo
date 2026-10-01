/* Onay bağlantısı: HMAC-SHA256 imzalı, tahmin edilemez. Bağlantı bir Workflow örneği kimliğine
   (UUID) bağlıdır ve yalnız o örneğe "onayla" olayı gönderebilir. İmza yoksa onay yolu kapalıdır. */

const ENCODER = new TextEncoder();

function toBase64Url(bytes: ArrayBuffer) {
  let bin = '';
  for (const b of new Uint8Array(bytes)) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function sign(secret: string, instanceId: string) {
  const key = await crypto.subtle.importKey('raw', ENCODER.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return toBase64Url(await crypto.subtle.sign('HMAC', key, ENCODER.encode(`report-approve:${instanceId}`)));
}

export const INSTANCE_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export async function approvalToken(secret: string, instanceId: string) {
  return sign(secret, instanceId);
}

/* Sabit zamanlı karşılaştırma. */
export async function verifyApproval(secret: string, instanceId: string, token: string) {
  if (!secret || !INSTANCE_ID.test(instanceId) || !token || token.length > 128) return false;
  const expected = await sign(secret, instanceId);
  if (expected.length !== token.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ token.charCodeAt(i);
  return diff === 0;
}
