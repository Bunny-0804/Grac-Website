CREATE OR REPLACE FUNCTION task_assign()
RETURNS TRIGGER AS $$
BEGIN
    IF(TG_OP = 'INSERT') THEN
        UPDATE task t SET completion = 'assigned' WHERE t.task_id = NEW.task_id; 
        RETURN NEW;

    ELSE
        IF(SELECT 1 FROM task WHERE task_id = OLD.task_id AND completion != 'completed') THEN
            UPDATE task t SET completion = 'unassigned' WHERE t.task_id = OLD.task_id;
        END IF;
        RETURN OLD;
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;