CREATE TYPE assignment_status AS ENUM('assigned','unassigned','unavailable');
ALTER TABLE resource ADD COLUMN resource_status assignment_status NOT NULL DEFAULT 'unassigned';

UPDATE resource r SET resource_status = 'assigned' FROM task_resources tr WHERE r.resource_id  = tr.resource_id;