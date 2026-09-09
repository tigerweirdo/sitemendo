export type FormStep = 'url' | 'email' | 'done';
export type FormMode = 'live' | 'demo' | null;

export type PersistedForm = {
  step: FormStep;
  url: string;
  email: string;
  mode: FormMode;
};

export const FORM_STORAGE_KEY = 'sitemendo.auditForm';

export function readPersistedForm(): PersistedForm | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(FORM_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<PersistedForm>;
    if (parsed.step !== 'url' && parsed.step !== 'email' && parsed.step !== 'done') return null;
    return {
      step: parsed.step,
      url: typeof parsed.url === 'string' ? parsed.url : '',
      email: typeof parsed.email === 'string' ? parsed.email : '',
      mode: parsed.mode === 'live' || parsed.mode === 'demo' ? parsed.mode : null,
    };
  } catch {
    return null;
  }
}

export function writePersistedForm(state: PersistedForm) {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore quota / private mode */
  }
}

export function clearPersistedForm() {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem(FORM_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
