CREATE OR REPLACE FUNCTION task_assign()
RETURNS TRIGGER AS $$
BEGIN
    IF(TG_OP = 'INSERT') THEN
        UPDATE task SET completion = 'assigned' WHERE task_id = NEW.task_id AND completion != 'assigned'; 
        RETURN NEW;

    ELSE
        IF NOT EXISTS (SELECT 1 FROM task_assignment WHERE task_id = OLD.task_id AND member_id != OLD.member_id) THEN 
            UPDATE task t SET completion = 'unassigned' WHERE t.task_id = OLD.task_id AND completion = 'assigned';
        END IF;
        RETURN OLD;
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;