import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import { validateContactForm } from './src/utils/validation.ts';
import { validateAppointmentForm } from './src/utils/appointment.ts';

interface StoredInquiry {
  referenceId: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  submittedAt: string;
}

interface StoredAppointment {
  appointmentId: string;
  patientName: string;
  phone: string;
  appointmentType: string;
  preferredDate: string;
  timeSlot: string;
  notes: string;
  bookedAt: string;
}

const PORT = Number(process.env.PORT || 3000);
const isProduction = process.env.NODE_ENV === 'production';
const inquiries: StoredInquiry[] = [];
const appointments: StoredAppointment[] = [];

function persistRecordSafely<T>(filename: string, entry: T): void {
  try {
    const dataDir = path.resolve(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const logPath = path.join(dataDir, filename);
    const existing = fs.existsSync(logPath)
      ? (JSON.parse(fs.readFileSync(logPath, 'utf8')) as T[])
      : [];
    existing.push(entry);
    fs.writeFileSync(logPath, JSON.stringify(existing.slice(-200), null, 2), 'utf8');
  } catch {
    // Non-fatal if filesystem is read-only; in-memory array still holds the submission
  }
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '64kb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'khuzdar-outreach-center' });
  });

  app.post('/api/contact', (req, res) => {
    const validation = validateContactForm(req.body ?? {});
    if (!validation.valid) {
      res.status(400).json({
        success: false,
        message: 'Please correct the highlighted fields and try again.',
        errors: validation.errors,
      });
      return;
    }

    const referenceId = `KZD-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
    const submittedAt = new Date().toISOString();

    const record: StoredInquiry = {
      referenceId,
      ...validation.sanitized,
      email: validation.sanitized.email ?? '',
      submittedAt,
    };

    inquiries.push(record);
    persistRecordSafely('inquiries.json', record);

    res.status(201).json({
      success: true,
      referenceId,
      submittedAt,
      message:
        'Your inquiry has been received by Dr. Ziauddin Hospital Outreach Medical Services, Khuzdar. Our desk will contact you during operating hours (8:30 AM – 9:30 PM).',
    });
  });

  app.post('/api/appointments', (req, res) => {
    const validation = validateAppointmentForm(req.body ?? {});
    if (!validation.valid) {
      res.status(400).json({
        success: false,
        message: 'Please complete all required appointment details.',
        errors: validation.errors,
      });
      return;
    }

    const appointmentId = `APT-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
    const bookedAt = new Date().toISOString();

    const record: StoredAppointment = {
      appointmentId,
      ...validation.sanitized,
      notes: validation.sanitized.notes ?? '',
      bookedAt,
    };

    appointments.push(record);
    persistRecordSafely('appointments.json', record);

    res.status(201).json({
      success: true,
      appointmentId,
      bookedAt,
      appointment: record,
      message:
        'Your doctor appointment request has been registered with the Khuzdar OPD & Outreach Desk. Our team will confirm your slot via phone.',
    });
  });

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(
      `Dr. Ziauddin Hospital Khuzdar Outreach server running on http://localhost:${PORT}`
    );
  });
}

startServer();
