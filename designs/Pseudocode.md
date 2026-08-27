## STUDENT/ASSESSOR_Login
BEGIN
    INPUT user_role
    INPUT email_address
    INPUT password

    IF credentials_are_valid(email_address, password) THEN
        IF user_role = "STUDENT" THEN
            Redirect to STUDENT_Dashboard
        ELSE IF user_role = "ASSESSOR" THEN
            Redirect to ASSESSOR_Dashboard
        ENDIF
    ELSE
        Display authentication_error
    ENDIF

    IF user_selects_register THEN
        IF user_role = "STUDENT" THEN
            Redirect to STUDENT_Registration
        ELSE IF user_role = "ASSESSOR" THEN
            Redirect to ASSESSOR_Registration
        ENDIF
    ENDIF
END


## STUDENT_REgistration

BEGIN
    INPUT first_name, last_name, id_number, contact_number, email, password, confirm_password

    IF password = confirm_password THEN
        Create learner_account
        Store learner_record
        Display registration_success
        Provide link_to_login
    ELSE
        Display password_mismatch_error
    ENDIF
END



## STUDENT_Login

BEGIN
    INPUT email, password

    IF credentials_are_valid(email, password) THEN
        Redirect to STUDENT_Dashboard
    ELSE
        Display login_error
    ENDIF
END


## STUDENT_Dashboard

BEGIN
    Retrieve learner_profile
    Retrieve task_statistics

    Calculate total_tasks, completed_tasks, outstanding_tasks, overdue_tasks

    Display progress_summary

    Retrieve recent_outstanding_tasks
    FOR each task IN outstanding_tasks DO
        Display task_details
    ENDFOR
END


## STUDENT_Tasks_Management

BEGIN
    Retrieve learner_tasks
    INPUT search_keyword, category_filter, date_filter

    Filter task_list

    IF filtered_results_exist THEN
        Display tasks
    ELSE
        Display no_tasks_found_message
        Offer filter_reset_option
    ENDIF

    IF add_task_selected THEN
        Create new_task
    ENDIF
END


## STUDENT_Progress_Report

BEGIN
    Retrieve module_results

    FOR each module DO
        Calculate completion_rate
        Calculate pass_rate
        Determine academic_status
    ENDFOR

    Display performance_table

    IF print_requested THEN
        Generate printable_report
    ENDIF
END




## STUDENT_Support_Session_Bookings

BEGIN
    
    INPUT module_topic
    INPUT preferred_date
    INPUT preferred_time
    INPUT additional_notes

    Create booking_request

    Store booking_request

    Display booking_confirmation

    Retrieve previous_bookings

    Display booking_history
END

## STUDENT_Coded_Game_Challenge

BEGIN
    Initialize score, timer

    WHILE current_question <= total_questions DO
        Display question
        Start countdown_timer
        INPUT learner_answer

        IF answer_is_correct THEN
            Increase score
            Apply multiplier
        ENDIF

        Move to next_question
    ENDWHILE

    Update leaderboard
    Display final_results
END


## STUDENT_Settings

BEGIN
    Display preference_options
    INPUT theme_selection, display_density, profile_information

    IF save_changes_selected THEN
        Update learner_preferences
        Save profile_information
    ENDIF

    IF clear_preferences_selected THEN
        Restore default_settings
    ENDIF

    IF sign_out_selected THEN
        Terminate session
    ENDIF
END


## ASSESSOR_Registration

BEGIN
    INPUT first_name, last_name, contact_number, email, password, confirm_password

    IF password = confirm_password THEN
        Create assessor_account
        Store assessor_record
        Display registration_success
        Redirect to login_page
    ELSE
        Display password_mismatch_error
    ENDIF
END


## ASSESSOR_Login

BEGIN
    INPUT email, password

    IF credentials_are_valid(email, password) THEN
        Redirect to ASSESSOR_Dashboard
    ELSE
        Display login_error
    ENDIF
END


## ASSESSOR_Dashboard

BEGIN
    Retrieve learner_statistics, booking_statistics, activity_log

    Calculate total_learners, pending_bookings, overdue_tasks, average_completion_rate

    Display learner_overview
    Display recent_activity
    Display upcoming_support_sessions
END


## ASSESSOR_TASKS_MANAGEMENT_FOR_STUDENTS

BEGIN
    Retrieve learner_records
    INPUT search_term, status_filter

    Filter learner_list

    FOR each learner IN filtered_list DO
        Display learner_information
        Display completion_statistics
    ENDFOR

    IF profile_selected THEN
        Open learner_profile
    ENDIF

    Support pagination_navigation
END


## ASSESSOR_Bookings_Management

BEGIN
    Retrieve all_bookings
    INPUT status_filter, date_range

    Display filtered_bookings

    FOR each booking DO
        IF booking_status = pending THEN
            Allow confirm_action
            Allow decline_action
        ENDIF

        Allow reschedule_action
        Allow cancel_action
    ENDFOR

    Update booking_statuses
END


## ASSESSOR_Settings

BEGIN
    Display assessor_preferences
    INPUT theme_preference, notification_preferences, default_landing_view, profile_information

    IF save_changes_selected THEN
        Store updated_preferences
        Update account_information
    ENDIF

    IF sign_out_selected THEN
        End active_session
    ENDIF
END


## Portal's_End_State

BEGIN
    Terminate current_process
    Save outstanding_changes
    Release allocated_resources
    End user_interaction
END


