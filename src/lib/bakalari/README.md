# Bakaláři Integration

This directory contains the integration layer for the Bakaláři school system.

## Overview

The Bakaláři integration allows students to access their school data (grades, schedule, assignments, etc.) through the SPŠD IT Portal.

## Architecture

```
src/lib/bakalari/
├── bakalari-client.ts    # Main API client
└── README.md             # This file

src/types/
└── bakalari.ts           # Type definitions

src/app/api/bakalari/
├── grades/route.ts       # Grades API endpoint
├── schedule/route.ts     # Schedule API endpoint
├── tasks/route.ts        # Tasks API endpoint
├── communication/route.ts # Messages API endpoint
├── attendance/route.ts   # Attendance API endpoint
└── payments/route.ts     # Payments API endpoint
```

## Setup

### 1. Environment Variables

Add these to your `.env` file:

```env
# Bakaláři API Configuration
BAKALARI_API_URL=https://bakalari.spsmot.cz/api/v3
BAKALARI_CLIENT_ID=SPSD_IT_Portal
BAKALARI_CLIENT_SECRET=your-client-secret-here
```

### 2. User Credentials

There are several ways to handle Bakaláři authentication:

#### Option A: User-specific credentials (Recommended)
Each user stores their own Bakaláři credentials (encrypted):

```typescript
// Add to User model in prisma/schema.prisma
model User {
  // ... existing fields

  // Bakaláři integration
  bakalariUsername      String?
  bakalariPasswordHash  String?  // Encrypted
  bakalariAccessToken   String?
  bakalariRefreshToken  String?
  bakalariTokenExpiry   DateTime?
}
```

#### Option B: School-wide API key
Use a single API key provided by the school for all students:

```env
BAKALARI_API_KEY=school-provided-api-key
```

#### Option C: OAuth-style flow
Redirect users to Bakaláři login page, receive token on callback (if supported).

## Usage

### In API Routes

```typescript
import { createBakalariClient } from '@/lib/bakalari/bakalari-client';

// Create client with user's tokens
const client = createBakalariClient(
  user.bakalariAccessToken,
  user.bakalariRefreshToken
);

// Fetch grades
const grades = await client.getGrades();

// Fetch schedule
const schedule = await client.getCurrentWeekSchedule();

// Fetch assignments
const assignments = await client.getUpcomingAssignments(7);
```

### On Frontend

```typescript
// Fetch grades from our API
const response = await fetch('/api/bakalari/grades');
const { data } = await response.json();

// Display grades
grades.forEach(grade => {
  console.log(`${grade.subjectName}: ${grade.grade}`);
});
```

## API Client Methods

### Authentication
- `authenticate(username, password)` - Login to Bakaláři
- `refreshAuth()` - Refresh authentication token

### Grades
- `getGrades()` - Get all grades
- `getGradesSummary(semester)` - Get semester summary
- `getGradesBySubject(subjectId)` - Get grades for subject

### Schedule
- `getPermanentSchedule()` - Get regular timetable
- `getActualSchedule(date)` - Get schedule with substitutions
- `getCurrentWeekSchedule()` - Get current week

### Assignments
- `getAssignments()` - Get all assignments
- `getAssignment(id)` - Get specific assignment
- `getUpcomingAssignments(days)` - Get assignments due soon

### Messages
- `getReceivedMessages()` - Get inbox
- `getSentMessages()` - Get sent messages
- `getMessage(id)` - Get specific message
- `sendMessage(recipientId, subject, content)` - Send message
- `markMessageAsRead(id)` - Mark as read

### Attendance
- `getAbsences()` - Get absence records
- `getAbsenceSummary()` - Get attendance summary
- `getAbsencesByDateRange(from, to)` - Get absences in range

### Payments
- `getPayments()` - Get payment records
- `getPaymentSummary()` - Get payment summary
- `getPayment(id)` - Get specific payment

### Student Info
- `getUserInfo()` - Get current user information

## Error Handling

The client automatically handles:
- Token refresh on 401 Unauthorized
- Retry logic
- Error logging

```typescript
try {
  const grades = await client.getGrades();
} catch (error) {
  if (error instanceof BakalariApiError) {
    console.error(`Bakaláři error: ${error.message} (${error.statusCode})`);
  }
}
```

## Security Considerations

1. **Credential Storage**
   - Never store passwords in plain text
   - Use encryption for sensitive data
   - Rotate tokens regularly

2. **API Access**
   - Always verify user JWT before calling Bakaláři
   - Log all API access for audit trail
   - Implement rate limiting

3. **Data Privacy**
   - Only fetch data for authenticated user
   - Don't expose raw Bakaláři API to frontend
   - Sanitize all data before sending to client

## Development Status

- ✅ Type definitions created
- ✅ API client implemented
- ✅ API route structure created
- ⚠️ Credentials management pending
- ⚠️ Error handling to be enhanced
- ⚠️ Caching layer to be implemented
- ⚠️ Testing required

## Testing

To test the Bakaláři integration:

1. Set up Bakaláři credentials (see Setup above)
2. Authenticate a test user
3. Call API endpoints:

```bash
# Get grades
curl -X GET http://localhost:3000/api/bakalari/grades \
  -H "Cookie: accessToken=your-jwt-token"

# Get schedule
curl -X GET http://localhost:3000/api/bakalari/schedule \
  -H "Cookie: accessToken=your-jwt-token"
```

## Troubleshooting

### Common Issues

1. **401 Unauthorized**
   - Check if user has valid Bakaláři credentials
   - Verify token hasn't expired
   - Try manual authentication

2. **Network Error**
   - Verify BAKALARI_API_URL is correct
   - Check if Bakaláři server is accessible
   - Review firewall/proxy settings

3. **Data Format Error**
   - Bakaláři API version might have changed
   - Check type definitions match actual API
   - Review error logs

## Future Enhancements

- [ ] Implement caching layer (Redis)
- [ ] Add webhook support for real-time updates
- [ ] Create sync service for background updates
- [ ] Add data transformation/normalization
- [ ] Implement retry with exponential backoff
- [ ] Add comprehensive error messages
- [ ] Create admin panel for API monitoring
- [ ] Add support for bulk operations

## Resources

- [Bakaláři API Documentation](https://github.com/bakalari-api/bakalari-api-v3)
- [School System Info](https://bakalari.spsmot.cz)

## Support

For issues related to:
- API integration: Check this README and error logs
- Bakaláři system: Contact school IT support
- Authentication: See AUTH_README.md
