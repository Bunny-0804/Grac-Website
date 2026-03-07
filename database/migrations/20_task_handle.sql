CREATE TABLE handle_request (   request_id SERIAL PRIMARY KEY ,
                                member_id INT NOT NULL REFERENCES club_member(member_id) ON DELETE CASCADE,
                                task_id INT NOT NULL REFERENCES task(task_id) ON DELETE CASCADE ,
                                UNIQUE (member_id , task_id )
                                );