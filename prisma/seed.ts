/**
 * Prisma Database Seed Script
 *
 * Creates initial test data for local development:
 * - Admin user for testing
 * - Student user for testing
 * - Teacher user for testing
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Hash password for all test users
  const passwordHash = await bcrypt.hash('admin123', 10);

  // Create Admin User
  const admin = await prisma.user.upsert({
    where: { email: 'admin@spsd.cz' },
    update: {},
    create: {
      email: 'admin@spsd.cz',
      username: 'admin',
      displayName: 'Admin Test',
      firstName: 'Admin',
      lastName: 'Test',
      passwordHash,
      role: 'ADMIN',
      isActive: true,
      isVerified: true,
    },
  });

  console.log('✅ Created admin user:', admin.email);

  // Create Student User
  const student = await prisma.user.upsert({
    where: { email: 'student@spsd.cz' },
    update: {},
    create: {
      email: 'student@spsd.cz',
      username: 'student',
      displayName: 'Student Test',
      firstName: 'Jan',
      lastName: 'Novák',
      passwordHash,
      role: 'STUDENT',
      isActive: true,
      isVerified: true,
    },
  });

  console.log('✅ Created student user:', student.email);

  // Create Teacher User
  const teacher = await prisma.user.upsert({
    where: { email: 'teacher@spsd.cz' },
    update: {},
    create: {
      email: 'teacher@spsd.cz',
      username: 'teacher',
      displayName: 'Teacher Test',
      firstName: 'Marie',
      lastName: 'Nováková',
      passwordHash,
      role: 'TEACHER',
      isActive: true,
      isVerified: true,
    },
  });

  console.log('✅ Created teacher user:', teacher.email);

  // Create some audit log entries
  await prisma.auditLog.create({
    data: {
      userId: admin.id,
      action: 'LOGIN_SUCCESS',
      resource: 'auth',
      description: 'Admin logged in',
      success: true,
      ipAddress: '127.0.0.1',
      method: 'POST',
      path: '/api/auth/login',
      statusCode: 200,
    },
  });

  console.log('✅ Created sample audit log entry');

  console.log('\n🎉 Database seeded successfully!\n');
  console.log('📝 Test Users Created:');
  console.log('├─ Admin:   admin@spsd.cz   / admin123   [ADMIN role]');
  console.log('├─ Student: student@spsd.cz / admin123   [STUDENT role]');
  console.log('└─ Teacher: teacher@spsd.cz / admin123   [TEACHER role]');
  console.log('\n💡 You can now login with any of these accounts!\n');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
