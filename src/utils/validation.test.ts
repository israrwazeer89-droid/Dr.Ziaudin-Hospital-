import test from 'node:test';
import assert from 'node:assert/strict';
import { validateContactForm } from './validation';

test('validateContactForm rejects empty required fields', () => {
  const result = validateContactForm({
    name: '',
    phone: '',
    service: 'OPD Clinic',
    message: '',
  });
  assert.equal(result.valid, false);
  assert.ok(result.errors.name);
  assert.ok(result.errors.phone);
  assert.ok(result.errors.message);
});

test('validateContactForm accepts valid inquiry with Pakistani phone format', () => {
  const result = validateContactForm({
    name: '  Tariq Baloch  ',
    phone: '0320-0800438',
    email: 'tariq@example.com',
    service: 'Laboratory Pick-Up Point',
    message: 'Please share the morning collection hours for blood tests.',
  });
  assert.equal(result.valid, true);
  assert.deepEqual(result.errors, {});
  assert.equal(result.sanitized.name, 'Tariq Baloch');
  assert.equal(result.sanitized.service, 'Laboratory Pick-Up Point');
});

test('validateContactForm rejects malformed email when provided', () => {
  const result = validateContactForm({
    name: 'Sana Ullah',
    phone: '+923200800438',
    email: 'not-an-email',
    service: 'Referral Desk',
    message: 'Need details about the referral desk process.',
  });
  assert.equal(result.valid, false);
  assert.ok(result.errors.email);
});

test('validateContactForm defaults unknown service values safely', () => {
  const result = validateContactForm({
    name: 'Amina Bibi',
    phone: '03200800438',
    service: 'Unknown Service',
    message: 'Checking general visiting timings at Sada Bahar Plaza.',
  });
  assert.equal(result.valid, true);
  assert.equal(result.sanitized.service, 'General Inquiry');
});
