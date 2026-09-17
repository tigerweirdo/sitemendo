const hits = new Map<string, number[]>();

/* Bellekte tutulur: sunucu örneği yeniden başlayınca sıfırlanır ve örnekler arasında
   paylaşılmaz. Kalıcı sınır için Vercel Firewall kuralı ya da harici bir depo gerekir. */
function limited(key: string, max: number, windowMs: number) {
  const now = Date.now();
  const recent = (hits.get(key) || []).filter(t => now - t < windowMs);
  if (recent.length >= max) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  return false;
}

export function clientIp(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown';
  return request.headers.get('x-real-ip')?.trim() || 'unknown';
}

export function tooManyRequests(ip: string) {
  return limited(`ip:${ip}`, 5, 10 * 60 * 1000);
}

/* Aynı adrese günde en fazla iki onay e-postası: form başkasına e-posta yağdırmak için
   kullanılamasın. */
export function tooManyForEmail(email: string) {
  return limited(`mail:${email.toLowerCase()}`, 2, 24 * 60 * 60 * 1000);
}
