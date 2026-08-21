# Learner Portal Test Plan

## Login & Registration 
  - Verify learners can register with valid details (name, ID, email, password).  
  - Confirm login works with correct credentials and rejects invalid ones.  
  - Test “Forgot Password” recovery flow.

## Dashboard Overview  
  - Validate task counts (completed, outstanding, overdue) match actual tasks.  
  - Ensure overdue tasks are highlighted correctly.

## Task Management  
  - Add, edit, and delete tasks.  
  - Test filtering by category, due date, and sorting.  
  - Confirm “No Tasks Found” empty state appears when filters return no results.

## Progress Tracking 
  - Verify module completion percentages and pass rates are calculated correctly.  
  - Ensure “AT RISK” status triggers when thresholds are not met.

## Support Session Booking 
  - Test booking creation with topic, date, and time.  
  - Validate booking confirmation and pending states.  
  - Check that learners can view upcoming sessions.

## Gaming Challenge 
  - Ensure questions load correctly with timers.  
  - Validate scoring system (XP, multipliers).  
  - Confirm leaderboard updates after each challenge.

## Settings 
  - Test theme switching (light/dark).  
  - Validate layout density changes.  
  - Confirm account info updates (name, email).

---

# Assessor Portal Test Plan

## Login & Registration 
  - Verify assessor account creation and login.  
  - Confirm role-based access (assessor vs learner).

## Dashboard Overview 
  - Validate learner statistics (total learners, completion %, overdue tasks).  
  - Ensure pending bookings count matches booking records.

## Learner Monitoring  
  - Test search and filter by learner name/email.  
  - Verify learner progress data (completed vs outstanding tasks).  
  - Confirm “AT RISK” learners are flagged correctly.

## Booking Management  
  - Validate confirm, reschedule, and cancel actions.  
  - Ensure booking status updates reflect in learner view.  
  - Test date range filters for upcoming sessions.

## Notifications
  - Verify email alerts for new bookings and late submissions.  
  - Test weekly digest option.  
  - Confirm notifications respect assessor preferences.

## Settings 
  - Validate theme switching (light/dark grayscale).  
  - Confirm privilege role is displayed correctly.  
  - Ensure account info updates save properly.

---

## Test Coverage Goals
Functional Testing
- Core features work as expected.  
Usability Testing
- Learners and assessors can navigate easily.  
Security Testing
- Login, password handling, and role-based access are secure.  
Performance Testing
- Dashboard loads quickly even with many learners/tasks.  

