import test from 'node:test';
import assert from 'node:assert/strict';
import { getOpeningStatus, WEEKLY_SCHEDULE } from './hours';

test('WEEKLY_SCHEDULE covers all 7 days with 8:30 AM – 9:30 PM', () => {
  assert.equal(WEEKLY_SCHEDULE.length, 7);
  for (const entry of WEEKLY_SCHEDULE) {
    assert.equal(entry.hours, '8:30 AM – 9:30 PM');
    assert.equal(entry.openMinutes, 510);
    assert.equal(entry.closeMinutes, 1290);
  }
});

test('getOpeningStatus returns Open Now during daytime in PKT (UTC+5)', () => {
  // 10:00 AM PKT = 05:00 UTC
  const midMorning = new Date('2026-11-24T05:00:00Z');
  const status = getOpeningStatus(midMorning);
  assert.equal(status.isOpen, true);
  assert.equal(status.statusLabel, 'Open Now');
  assert.equal(status.detailLabel, 'Closes at 9:30 PM PKT');
  assert.equal(status.currentDayName, 'Tuesday');
});

test('getOpeningStatus shows countdown within 60 minutes before closing', () => {
  // 9:00 PM PKT = 16:00 UTC
  const beforeClose = new Date('2026-11-24T16:00:00Z');
  const status = getOpeningStatus(beforeClose);
  assert.equal(status.isOpen, true);
  assert.equal(status.detailLabel, 'Closes in 30 min (9:30 PM PKT)');
});

test('getOpeningStatus returns Closed Now before 8:30 AM PKT', () => {
  // 7:00 AM PKT = 02:00 UTC
  const earlyMorning = new Date('2026-11-24T02:00:00Z');
  const status = getOpeningStatus(earlyMorning);
  assert.equal(status.isOpen, false);
  assert.equal(status.statusLabel, 'Closed Now');
  assert.equal(status.detailLabel, 'Opens today at 8:30 AM PKT');
});

test('getOpeningStatus returns Closed Now at or after 9:30 PM PKT', () => {
  // 9:30 PM PKT = 16:30 UTC
  const atClosing = new Date('2026-11-24T16:30:00Z');
  const status = getOpeningStatus(atClosing);
  assert.equal(status.isOpen, false);
  assert.equal(status.statusLabel, 'Closed Now');
  assert.equal(status.detailLabel, 'Opens tomorrow at 8:30 AM PKT');
});
