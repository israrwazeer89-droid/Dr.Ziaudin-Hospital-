import test from 'node:test';
import assert from 'node:assert/strict';
import {
  APPOINTMENT_TIME_SLOTS,
  APPOINTMENT_TYPES,
  getTodayIsoDatePakistan,
  validateAppointmentForm,
} from './appointment';

test('getTodayIsoDatePakistan returns YYYY-MM-DD in Asia/Karachi', () => {
  // 2026-11-24T20:00:00Z is 2026-11-25T01:00:00+05:00 in PKT
  const date = new Date('2026-11-24T20:00:00Z');
  assert.equal(getTodayIsoDatePakistan(date), '2026-11-25');
});

test('validateAppointmentForm rejects missing fields and past dates', () => {
  const ref = new Date('2026-11-24T10:00:00Z');
  const result = validateAppointmentForm(
    {
      patientName: '',
      phone: '123',
      preferredDate: '2026-11-23',
      timeSlot: '',
    },
    ref
  );
  assert.equal(result.valid, false);
  assert.ok(result.errors.patientName);
  assert.ok(result.errors.phone);
  assert.ok(result.errors.preferredDate);
  assert.ok(result.errors.timeSlot);
});

test('validateAppointmentForm accepts valid OPD appointment request', () => {
  const ref = new Date('2026-11-24T10:00:00Z');
  const result = validateAppointmentForm(
    {
      patientName: '  Zahid Mengal  ',
      phone: '0320-0800438',
      appointmentType: APPOINTMENT_TYPES[0],
      preferredDate: '2026-11-25',
      timeSlot: APPOINTMENT_TIME_SLOTS[1],
      notes: 'Follow-up consultation',
    },
    ref
  );
  assert.equal(result.valid, true);
  assert.deepEqual(result.errors, {});
  assert.equal(result.sanitized.patientName, 'Zahid Mengal');
  assert.equal(result.sanitized.timeSlot, '11:00 AM – 01:00 PM');
});
