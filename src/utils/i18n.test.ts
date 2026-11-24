import test from 'node:test';
import assert from 'node:assert/strict';
import { GALLERY_PHOTOS, MEDICAL_SERVICES } from '../data/hospitalData.ts';
import { FAQ_ITEMS } from './faq.ts';
import {
  FAQ_ITEMS_UR,
  GALLERY_PHOTOS_UR,
  SERVICES_UR,
  SITE_COPY,
  WEEKDAYS_UR,
} from '../data/translations.ts';

test('Urdu translations cover all 5 medical services', () => {
  for (const service of MEDICAL_SERVICES) {
    assert.ok(SERVICES_UR[service.id], `Missing Urdu translation for ${service.id}`);
    assert.ok(SERVICES_UR[service.id].title.length > 0);
  }
});

test('Urdu translations cover all 11 gallery photos', () => {
  for (const photo of GALLERY_PHOTOS) {
    assert.ok(GALLERY_PHOTOS_UR[photo.id], `Missing Urdu caption for ${photo.id}`);
  }
});

test('Urdu translations cover all 7 FAQs and all 7 weekdays', () => {
  for (const faq of FAQ_ITEMS) {
    assert.ok(FAQ_ITEMS_UR[faq.id], `Missing Urdu FAQ for ${faq.id}`);
  }
  assert.equal(Object.keys(WEEKDAYS_UR).length, 7);
  assert.equal(SITE_COPY.switchLanguageLabel.en, 'اردو');
  assert.equal(SITE_COPY.switchLanguageLabel.ur, 'English');
});
