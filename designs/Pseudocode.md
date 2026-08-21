## STUDENT/ASSESSOR_Login

BEGIN
Display login interface

    INPUT user_role
    INPUT email_address
    INPUT password

    IF credentials_are_valid(email_address, password) THEN
        Grant access to portal
        Redirect to role_dashboard
    ELSE
        Display authentication_error
    ENDIF

    IF user_selects_register THEN
        Redirect to registration

## STUDENT_REgistration

BEGIN
Collect student_details

    INPUT first_name
    INPUT last_name
    INPUT id_number
    INPUT contact_number
    INPUT email
    INPUT password
    INPUT confirm_password

    IF password = confirm_password THEN
        Create learner_account
        Store learner_record
        Display registration_success
    ELSE
        Display password_mismatch_error
    ENDIF

    Provide link_to_login
END

## STUDENT_Login

BEGIN
    
    INPUT email
    INPUT password

    Validate credentials

    IF valid THEN

## STUDENT_Dashboard

BEGIN
    
    Retrieve learner_profile
    Retrieve task_statistics

    Calculate:
        total_tasks
        completed_tasks
        outstanding_tasks
        overdue_tasks

    Display progress_summary

    Retrieve recent_outstanding_tasks

    FOR each task IN outstanding_tasks DO
        Display task_details
    ENDFOR
END

## STUDENT_Tasks_Management

BEGIN
Retrieve learner_tasks

    INPUT search_keyword
    INPUT category_filter
    INPUT date_filter

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
    
    Initialize score
    Initialize timer

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

    INPUT theme_selection
    INPUT display_density

    INPUT profile_information

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

Collect assessor_information

    INPUT first_name
    INPUT last_name
    INPUT contact_number
    INPUT email
    INPUT password
    INPUT confirm_password

    IF password = confirm_password THEN
        Create assessor_account
        Store assessor_record
    ELSE
        Display validation_error
    ENDIF

    Redirect to login_page
END

## ASSESSOR_Login

BEGIN
    
    INPUT email
    INPUT password

    Authenticate assessor

    IF authentication_successful THEN
        Open assessor_dashboard
    ELSE
        Display login_error
    ENDIF
END

## ASSESSOR_Dashboard

BEGIN
    
    Retrieve learner_statistics
    Retrieve booking_statistics
    Retrieve activity_log

    Calculate:
        total_learners
        pending_bookings
        overdue_tasks
        average_completion_rate

    Display learner_overview

    Display recent_activity

    Display upcoming_support_sessions
END

## ASSESSOR_TASKS_MANAGEMENT_FOR_STUDENTS

BEGIN
    
    Retrieve learner_records

    INPUT search_term
    INPUT status_filter

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

    INPUT status_filter
    INPUT date_range

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

    INPUT theme_preference
    INPUT notification_preferences
    INPUT default_landing_view

    INPUT profile_information

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

