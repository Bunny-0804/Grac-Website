CREATE TABLE club_member ( member_id SERIAL PRIMARY KEY,
                          password_hash VARCHAR(255) NOT NULL,
                          member_roll_no VARCHAR(20) UNIQUE NOT NULL,
                          member_email VARCHAR(100) UNIQUE NOT NULL,
                          member_role VARCHAR(100)
                        );

CREATE TABLE project ( project_id SERIAL PRIMARY KEY,
                        project_name VARCHAR(100) NOT NULL,
                        project_description TEXT,
                        project_start_date DATE NOT NULL,
                        project_end_date DATE NOT NULL CHECK (project_end_date >= project_start_date)
                      );

CREATE TABLE resource ( resource_id SERIAL PRIMARY KEY,
                        resource_name VARCHAR(100) NOT NULL
                      );

CREATE TABLE event ( event_id SERIAL PRIMARY KEY,
                      event_start_date DATE NOT NULL,
                      event_end_date DATE NOT NULL CHECK (event_end_date >= event_start_date),
                      project_id INT,
                      FOREIGN KEY (project_id) REFERENCES project (project_id) ON DELETE CASCADE
                    );

CREATE TABLE task ( task_id SERIAL PRIMARY KEY,
                     task_description VARCHAR(200) NOT NULL,
                     task_assignment_date DATE NOT NULL DEFAULT CURRENT_DATE,
                     task_due_date DATE NOT NULL CHECK (task_due_date >= task_assignment_date),
                     project_id INT,
                     FOREIGN KEY (project_id) REFERENCES project (project_id) ON DELETE CASCADE
                   );

CREATE TABLE task_assignment ( assignment_id SERIAL PRIMARY KEY,
                               task_id INT,
                               member_id INT,
                               FOREIGN KEY (task_id) REFERENCES task (task_id) ON DELETE CASCADE,
                               FOREIGN KEY (member_id) REFERENCES club_member (member_id) ON DELETE CASCADE
                             );

CREATE TABLE task_resources ( resource_assignment_id SERIAL PRIMARY KEY,
                              task_id INT,
                              resource_id INT,
                              FOREIGN KEY (task_id) REFERENCES task (task_id) ON DELETE CASCADE,
                              FOREIGN KEY (resource_id) REFERENCES resource (resource_id) ON DELETE CASCADE
                             );

CREATE TABLE position ( positions_id SERIAL PRIMARY KEY,
                         member_id INT,
                         event_role VARCHAR(100) NOT NULL,
                         event_id INT,
                         FOREIGN KEY (member_id) REFERENCES club_member (member_id) ON DELETE CASCADE,
                         FOREIGN KEY (event_id) REFERENCES event (event_id) ON DELETE CASCADE
                       );

CREATE TABLE task_attachment ( attachment_id SERIAL PRIMARY KEY,
                               task_id INT REFERENCES task(task_id) ON DELETE CASCADE,
                               file_name VARCHAR(255) NOT NULL,    
                               file_url TEXT NOT NULL,             
                               file_type VARCHAR(50),              
                               file_uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                             );