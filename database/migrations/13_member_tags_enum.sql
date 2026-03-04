CREATE TYPE member_tags AS ENUM('Member' , 'Lead' , 'Admin' , 'Alumni');
ALTER TABLE club_member ALTER COLUMN member_role TYPE member_tags USING member_role::member_tags;
ALTER TABLE club_member ALTER COLUMN member_role SET DEFAULT 'Member';
ALTER TABLE club_member ALTER COLUMN member_role SET NOT NULL;