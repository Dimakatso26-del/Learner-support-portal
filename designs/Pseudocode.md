## STUDENT/ASSESSOR_Login

BEGIN

    INPUT email_address
    INPUT password
    INPUT user_role

    IF credentials_are_valid(email_address, password) THEN

            IF user_role = "STUDENT" THEN
            Redirect to STUDENT_Dashboard

        ELSE IF user_role = "ASSESSOR" THEN
            Redirect to ASSESSOR_Dashboard

        ELSE
            Display "Invalid Role"

        ENDIF

        ELSE
            Display authentication_error
        ENDIF

    IF user_selects_register = TRUE THEN

        IF user_role = "STUDENT" THEN
            Redirect to STUDENT_Registration

        ELSE IF user_role = "ASSESSOR" THEN
            Redirect to ASSESSOR_Registration

        ELSE
            Display "Invalid Role"

        ENDIF

    ENDIF

END


## STUDENT_Registration

BEGIN
    
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
    
    SET total_tasks = completed_tasks + outstanding_tasks

    SET completion_percentage =
        (completed_tasks / total_tasks) * 100

    IF overdue_tasks > 0 THEN
        Display "Overdue Tasks Exist"
    ENDIF

    Display progress_summary

    Retrieve recent_outstanding_tasks

    FOR each task IN recent_outstanding_tasks DO
    
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

    IF add_task_selected = TRUE THEN
        Create new_task
    ENDIF
END


## STUDENT_Progress_Report

BEGIN

    Retrieve module_results

    FOR each module DO

        Calculate completion_rate
        Calculate pass_rate

        IF pass_rate >= 50 THEN
            academic_status = "Pass"
        ELSE
            academic_status = "At Risk"
        ENDIF

    ENDFOR

    Display performance_table

    IF print_requested = TRUE THEN
        Generate printable_report
    ENDIF
END




## STUDENT_Support_Session_Bookings

BEGIN
    
    INPUT module_topic
    INPUT preferred_date
    INPUT preferred_time
    INPUT additional_notes

    IF module_topic IS NOT EMPTY AND
       preferred_date IS NOT EMPTY AND
       preferred_time IS NOT EMPTY THEN

        Create booking_request
        Store booking_request

        Display booking_confirmation

    ELSE
        Display validation_error

    ENDIF

    Retrieve previous_bookings

    IF previous_bookings_exist THEN
        Display booking_history
    ELSE
        Display "No previous bookings found"
    ENDIF
END

## STUDENT_Coded_Game_Challenge

BEGIN

    SET score = 0
    SET multiplier = 2

    WHILE current_question <= total_questions DO

        Display question
        Start countdown_timer

        INPUT learner_answer

        IF answer_is_correct THEN
            score = score + (1 * multiplier)
        ENDIF

            current_question = current_question + 1

    ENDWHILE

    IF score >= passing_score THEN
        Display "Quiz Passed"
    ELSE
        Display "Quiz Not Passed"
    ENDIF

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
   
    INPUT first_name
    INPUT last_name
    INPUT contact_number
    INPUT email
    INPUT password
    INPUT confirm_password

    IF first_name IS NOT EMPTY AND
        last_name IS NOT EMPTY AND
        email IS NOT EMPTY THEN

    IF password = confirm_password THEN

        Create assessor_account
        Store assessor_record

        Display registration_success

        Redirect to login_page

    ELSE
        Display password_mismatch_error
    ENDIF

    ELSE
        Display validation_error
    ENDIF
END


## ASSESSOR_Login

BEGIN

    INPUT email
    INPUT password

    IF email IS NOT EMPTY AND password IS NOT EMPTY THEN

        IF credentials_are_valid(email, password) THEN
            Redirect to ASSESSOR_Dashboard
        ELSE
            Display login_error
        ENDIF

    ELSE
        Display validation_error

    ENDIF
END


## ASSESSOR_Dashboard

BEGIN

    INPUT email
    INPUT password

    IF email IS NOT EMPTY AND password IS NOT EMPTY THEN

        IF credentials_are_valid(email, password) THEN
            Redirect to ASSESSOR_Dashboard
        ELSE
            Display login_error
        ENDIF

    ELSE
        Display validation_error

    ENDIF
END


## ASSESSOR_TASKS_MANAGEMENT_FOR_STUDENTS

BEGIN

    Retrieve learner_records

    INPUT search_term
    INPUT status_filter

    Filter learner_list

    IF filtered_list IS NOT EMPTY THEN

        FOR each learner IN filtered_list DO

            Calculate completion_percentage

            Display learner_information
            Display completion_statistics

        ENDFOR

    ELSE
        Display "No learners found"
    ENDIF

    IF profile_selected = TRUE THEN
        Open learner_profile
    ENDIF

    Support pagination_navigation

END


## ASSESSOR_Bookings_Management

BEGIN

    Retrieve all_bookings

    INPUT status_filter
    INPUT date_range

    Filter bookings using status_filter and date_range

    Display filtered_bookings

    FOR each booking IN filtered_bookings DO

        IF booking_status = "pending" THEN
            Allow confirm_action
            Allow decline_action
        ENDIF

        Allow reschedule_action
        Allow cancel_action

    ENDFOR

    Calculate pending_booking_count
    Calculate confirmed_booking_count

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

    IF unsaved_changes_exist THEN
        Save outstanding_changes
    ENDIF

    Terminate current_process

    Release allocated_resources

    End user_interaction

END


