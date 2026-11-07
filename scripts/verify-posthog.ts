/**
 * PostHog: canlı alan adı allowlist, webdriver engeli, tek sayfa görüntüleme dedupe.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { POSTHOG_ALLOWED_HOSTNAMES } from '../lib/analytics/config';
import { isAutomatedBrowser, isPostHogAllowedHostname } from '../lib/analytics/runtime';
import {
  resetPostHogClientState,
  safePagePath,
  shouldCapturePageview,
  shouldInitPostHog,
} from '../lib/analytics/posthog';

const KEY = 'phc_test';
const PAGEVIEW_DEDUPE_MS = 2500;

test('allowlist yalnızca canlı alan adlarını içerir', () => {
  assert.deepEqual([...POSTHOG_ALLOWED_HOSTNAMES], ['sitemendo.com', 'www.sitemendo.com']);
  assert.ok(isPostHogAllowedHostname('sitemendo.com'));
  assert.ok(isPostHogAllowedHostname('www.sitemendo.com'));
  assert.ok(isPostHogAllowedHostname('SITEMENDO.COM'));
  for (const host of ['localhost', '127.0.0.1', 'sitemendo.workers.dev', 'preview.example.com']) {
    assert.ok(!isPostHogAllowedHostname(host), host);
  }
});

test('shouldInitPostHog: webdriver ve DNT kapalı, allowlist şart', () => {
  const base = { hostname: 'sitemendo.com', projectKey: KEY, dnt: false, webdriver: false };
  assert.ok(shouldInitPostHog(base));
  assert.ok(!shouldInitPostHog({ ...base, hostname: 'localhost' }));
  assert.ok(!shouldInitPostHog({ ...base, webdriver: true }));
  assert.ok(!shouldInitPostHog({ ...base, dnt: true }));
  assert.ok(!shouldInitPostHog({ ...base, projectKey: '' }));
  assert.ok(isAutomatedBrowser(true));
  assert.ok(!isAutomatedBrowser(false));
  assert.ok(!isAutomatedBrowser(undefined));
});

test('safePagePath sorgu ve hash kaldırır', () => {
  assert.equal(safePagePath('/de?lang=de&utm=x'), '/de');
  assert.equal(safePagePath('/#kontakt'), '/');
  assert.equal(safePagePath('/ratgeber/foo#bar'), '/ratgeber/foo');
});

test('shouldCapturePageview aynı yolda kısa sürede yalnız bir kez', () => {
  resetPostHogClientState();
  const path = '/de';
  const t0 = 1_000_000;
  assert.ok(shouldCapturePageview(path, t0));
  assert.ok(!shouldCapturePageview(path, t0 + 100));
  assert.ok(!shouldCapturePageview(path, t0 + PAGEVIEW_DEDUPE_MS - 1));
  assert.ok(shouldCapturePageview(path, t0 + PAGEVIEW_DEDUPE_MS));
  assert.ok(shouldCapturePageview('/en', t0 + PAGEVIEW_DEDUPE_MS + 1));
});
