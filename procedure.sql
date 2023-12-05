DROP PROCEDURE CalculateRecruiterStats;

DELIMITER //

CREATE PROCEDURE CalculateRecruiterStats(
    IN company_id_input INT,
    OUT male_count INT,
    OUT male_percentage DECIMAL(5,2),
    OUT female_count INT,
    OUT female_percentage DECIMAL(5,2),
    OUT exp_counts JSON
)
BEGIN
    -- Declare variables for gender cursor
    DECLARE total_gender_applicants INT;

    -- Declare variables for experience cursor
    DECLARE total_exp_applicants INT;

    -- Loop through experience cursor results
    DECLARE exp_result JSON;

    DECLARE gender_value VARCHAR(255);
    DECLARE gender_count INT;

    DECLARE exp_value VARCHAR(255);
    DECLARE exp_count INT;

    -- Gender cursor to fetch gender counts
    DECLARE gender_cursor CURSOR FOR
        SELECT gender, COUNT(DISTINCT s.student_id) AS count
		FROM Company c 
        JOIN Job_Role j ON c.company_id = j.company_id
        JOIN Applies a ON j.job_id = a.job_id
        JOIN Student s ON a.student_id = s.student_id
        WHERE c.company_id = company_id_input
        GROUP BY gender;

    -- Experience cursor to fetch experience counts
    DECLARE exp_cursor CURSOR FOR
        SELECT years_of_exp, COUNT(DISTINCT s.student_id)
        FROM Company c 
        JOIN Job_Role j ON c.company_id = j.company_id
        JOIN Applies a ON j.job_id = a.job_id
        JOIN Student s ON a.student_id = s.student_id
        JOIN Worked w ON s.student_id = w.student_id
        WHERE c.company_id = company_id_input
        GROUP BY years_of_exp;

    -- Declare handler for no data found
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET @finished = 0;

    -- Initialize total_gender_applicants and total_exp_applicants
    SET total_gender_applicants = 0;
    SET total_exp_applicants = 0;

    -- Open gender cursor
    OPEN gender_cursor;

    -- Loop through gender cursor results
    read_gender_loop: LOOP
        FETCH gender_cursor INTO gender_value, gender_count;

        -- Break the loop if no more rows
        IF @finished = 0 THEN
            LEAVE read_gender_loop;
        END IF;

        -- Update total_gender_applicants
        SET total_gender_applicants = total_gender_applicants + gender_count;

        -- Set output variables for male and female counts
        IF gender_value = 'M' THEN
            SET male_count = gender_count;
        ELSEIF gender_value = 'F' THEN
            SET female_count = gender_count;
        END IF;
    END LOOP;

    -- Close gender cursor
    CLOSE gender_cursor;

    -- Reset cursor to the beginning
    SET @finished = 1;

    -- Open experience cursor
    OPEN exp_cursor;
    
    SET exp_result = JSON_ARRAY();

    read_exp_loop: LOOP
        FETCH exp_cursor INTO exp_value, exp_count;

        -- Break the loop if no more rows
        IF @finished = 0 THEN
            LEAVE read_exp_loop;
        END IF;

        -- Update total_exp_applicants
        SET total_exp_applicants = total_exp_applicants + exp_count;

        -- Append to JSON result
        SET exp_result = JSON_ARRAY_APPEND(exp_result, '$', JSON_OBJECT('years_of_exp', exp_value, 'count', exp_count));
    END LOOP;

    -- Close experience cursor
    CLOSE exp_cursor;

    -- Calculate and set percentages for male and female
    SET male_percentage = (male_count / total_gender_applicants) * 100;
    SET female_percentage = (female_count / total_gender_applicants) * 100;

    -- Set output variable for experience counts as JSON
    SET exp_counts = exp_result;

    SET @finished = 1;
END //

DELIMITER ;

CALL CalculateRecruiterStats(1, @male_count, @male_percentage, @female_count, @female_percentage, @exp_counts);

SELECT @male_count, @male_percentage, @female_count, @female_percentage, @exp_counts;

