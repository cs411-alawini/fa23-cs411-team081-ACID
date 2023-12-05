drop trigger after_update_job_role;

DELIMITER //
CREATE TRIGGER update_applies_status
AFTER UPDATE ON Job_Role
FOR EACH ROW
BEGIN
    IF NEW.job_status = 'Closed' THEN
        UPDATE Applies
        SET status = 'Rejected'
        WHERE job_id = NEW.job_id;
    END IF;
END;
//
DELIMITER ;