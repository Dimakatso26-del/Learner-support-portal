# Learner Use Cases

## Task Management  
Learners can view, add, and track assignments. They see completed, outstanding, and overdue tasks, with filtering and sorting options.
Example: Dimakatso checks her overdue “Coding basics with JavaScript” task and schedules time to complete it.

## Progress Tracking  
Learners receive module-level summaries (pass rates, completion percentages, risk status).
Example: A learner sees Module 3 flagged “AT RISK” and knows to prioritize coding basics.

## Support Session Booking  
Learners request one-on-one sessions with assessors, choosing topics, dates, and times.
Example: Dimakatso books a session on “Arrays and Data Structures” for August 23.

## Gaming Learning  
Learners engage in code challenges, earn XP, and compete on leaderboards.
Example: Dimakatso maintains her streak to climb from 2nd place to 1st.

## Personalization Settings  
Learners adjust theme, layout density, and account details.
Example: Switching to dark mode for late-night study sessions.

--- 
# Assessor/Admin Use Cases

## Learner Oversight  
Assessors monitor learner progress, completion rates, and risk status.
Example: Londeka sees Blessing Manhique at 44% completion and flags them “AT RISK.”

## Booking Management  
Assessors confirm, reschedule, or cancel learner support sessions.
Example: Rescheduling Dimakatso’s coding session to a later time.

## Performance Analytics  
Assessors view overall statistics (average completion, overdue tasks, pending bookings).
Example: Dashboard shows “AVERAGE COMPLETION 72%,” guiding intervention strategies.

## Notifications & Preferences  
Assessors configure alerts for late submissions, new bookings, or weekly digests.
Example: Londeka enables email notifications for overdue tasks.

---

# Cookie Preference Banner

- Display a banner when the user first visits the application:

--------------------------------------------------
 We use cookies to improve your experience.

 [Accept Cookies]  [Reject Non-Essential Cookies]
--------------------------------------------------

## Pseudocode:

BEGIN:

    IF cookie_preference_not_set THEN
        Display cookie_banner
    ENDIF
    
    IF accept_selected THEN
      Save cookie_preference = "accepted"
      Hide cookie_banner
    ENDIF

    IF reject_selected THEN
        Save cookie_preference = "rejected"
        Hide cookie_banner
    ENDIF
END

## JavaScript code:

    acceptBtn.addEventListener("click", () => {
      document.cookie =
        "cookiePreference=accepted; max-age=31536000";
    });

