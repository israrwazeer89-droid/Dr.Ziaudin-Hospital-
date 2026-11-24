import test from 'node:test';
import assert from 'node:assert/strict';
import {
  FAQ_CATEGORIES,
  FAQ_ITEMS,
  filterFaqItems,
  toggleFaqId,
} from './faq';

test('FAQ_ITEMS covers all three requested patient topics', () => {
  const categories = new Set(FAQ_ITEMS.map((item) => item.category));
  assert.equal(categories.has('Lab Test Preparation'), true);
  assert.equal(categories.has('Appointments & OPD'), true);
  assert.equal(categories.has('Referral Process'), true);
  assert.equal(FAQ_CATEGORIES.length, 4);
});

test('filterFaqItems returns all items for All and filters specific categories', () => {
  assert.equal(filterFaqItems(FAQ_ITEMS, 'All').length, FAQ_ITEMS.length);
  const referralItems = filterFaqItems(FAQ_ITEMS, 'Referral Process');
  assert.ok(referralItems.length >= 2);
  assert.ok(referralItems.every((item) => item.category === 'Referral Process'));
});

test('toggleFaqId opens a closed item and collapses an already open item', () => {
  assert.equal(toggleFaqId(null, 'lab-fasting-prep'), 'lab-fasting-prep');
  assert.equal(toggleFaqId('lab-fasting-prep', 'lab-fasting-prep'), null);
  assert.equal(toggleFaqId('lab-fasting-prep', 'opd-booking-walkin'), 'opd-booking-walkin');
});
