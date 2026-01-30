-- 1. Club_member (25 entries)
INSERT INTO club_member (password_hash, member_roll_no, member_email, member_role) VALUES
('hash1', '22BCE001', 'arjun.m@grac.edu', 'Lead'),
('hash2', '22BCE002', 'priya.s@grac.edu', 'Member'),
('hash3', '22BCE003', 'rohan.d@grac.edu', 'Admin'),
('hash4', '22BCE004', 'sneha.r@grac.edu', 'Member'),
('hash5', '22BCE005', 'vikram.v@grac.edu', 'Member'),
('hash6', '22BCE006', 'ananya.i@grac.edu', 'Member'),
('hash7', '22BCE007', 'karthik.n@grac.edu', 'Lead'),
('hash8', '22BCE008', 'isha.g@grac.edu', 'Member'),
('hash9', '22BCE009', 'manish.v@grac.edu', 'Member'),
('hash10', '22BCE010', 'divya.p@grac.edu', 'Admin'),
('hash11', '22BCE011', 'sandeep.k@grac.edu', 'Member'),
('hash12', '22BCE012', 'tanvi.j@grac.edu', 'Member'),
('hash13', '22BCE013', 'abhishek.r@grac.edu', 'Lead'),
('hash14', '22BCE014', 'neha.m@grac.edu', 'Member'),
('hash15', '22BCE015', 'rahul.b@grac.edu', 'Member'),
('hash16', '22BCE016', 'pooja.h@grac.edu', 'Member'),
('hash17', '22BCE017', 'amit.s@grac.edu', 'Member'),
('hash18', '22BCE018', 'shruti.k@grac.edu', 'Member'),
('hash19', '22BCE019', 'varun.d@grac.edu', 'Member'),
('hash20', '22BCE020', 'ritika.s@grac.edu', 'Admin'),
('hash21', '22BCE021', 'akash.p@grac.edu', 'Member'),
('hash22', '22BCE022', 'meghna.k@grac.edu', 'Member'),
('hash23', '22BCE023', 'siddharth.r@grac.edu', 'Member'),
('hash24', '22BCE024', 'anjali.b@grac.edu', 'Member'),
('hash25', '22BCE025', 'yash.w@grac.edu', 'Member');

-- 2. Project (25 entries)
INSERT INTO project (project_name, project_description, project_start_date, project_end_date) VALUES
('AI Resume Profiler', 'Mistral-based internship matcher', '2025-09-01', '2025-12-30'),
('Club Website', 'Full stack React/Node/Postgres app', '2026-01-10', '2026-05-15'),
('Line Follower', 'Arduino-based IR sensor bot', '2025-10-15', '2025-11-20'),
('Smart Attendance', 'Face recognition system for club', '2025-11-01', '2026-02-28'),
('IoT Weather Station', 'ESP32 weather monitoring', '2025-08-05', '2025-10-10'),
('Gesture Car', 'Hand gesture controlled rover', '2026-01-05', '2026-03-20'),
('Drone Pathfinding', 'Autonomous obstacle avoidance', '2025-12-01', '2026-04-30'),
('Digit Recognizer', 'MNIST training with PyTorch', '2025-09-15', '2025-10-15'),
('Waste Bot', 'Object detection sorting arm', '2025-11-20', '2026-01-30'),
('Library Automation', 'RFID based book tracker', '2025-07-10', '2025-09-25'),
('Voice Assistant', 'Python voice command offline', '2026-02-01', '2026-06-15'),
('Face Mask Det.', 'CNN model for gate security', '2025-10-01', '2025-11-15'),
('Avoidance Rover', 'Ultrasonic sensor navigation', '2026-01-15', '2026-02-28'),
('Finance Tracker', 'Personal budget visualization', '2025-12-10', '2026-03-10'),
('Chat Application', 'Websocket based real-time chat', '2026-01-20', '2026-04-10'),
('Price Predictor', 'LSTM model for stock trends', '2025-08-01', '2025-10-31'),
('Virtual Keyboard', 'Computer vision gesture typing', '2025-11-05', '2025-12-20'),
('Microservices DB', 'Dockerized PG cluster scaling', '2026-01-01', '2026-05-01'),
('Fingerprint Lock', 'Biometric security module', '2025-09-20', '2025-11-20'),
('DDoS Simulator', 'Network stress testing tool', '2025-10-10', '2025-12-10'),
('Plant Disease Det.', 'Image classification for crops', '2026-02-10', '2026-05-15'),
('Media Scraper', 'Python Selenium data extractor', '2025-12-05', '2026-01-20'),
('Traffic Sign Class.', 'Autonomous driving visual aid', '2025-11-15', '2026-01-10'),
('Music Rec Engine', 'Collaborative filtering model', '2026-01-15', '2026-04-15'),
('Sentiment Analyzer', 'NLTK based tweet analysis', '2025-09-10', '2025-11-05');

-- 3. Resource (25 entries)
INSERT INTO resource (resource_name) VALUES
('Arduino Uno'), ('ESP32'), ('Raspberry Pi 4'), ('Ultrasonic Sensor'), 
('Lidar Module'), ('IR Sensor'), ('Servo Motor'), ('Breadboard'), 
('Jumper Wires'), ('3D Printer Filament'), ('NVIDIA Jetson'), 
('OLED Display'), ('GPS Module'), ('Battery 11.1V'), ('Soldering Kit'), 
('Multimeter'), ('Power Supply'), ('MicroSD 32GB'), ('Relay Module'), 
('Step Motor'), ('Camera Module'), ('Bluetooth HC-05'), ('Wifi Router'), 
('Ethernet Cable'), ('Screwdriver Set');

-- 4. Event (25 entries - linked to Projects 1-25)
INSERT INTO event (event_start_date, event_end_date, project_id) 
SELECT project_start_date, project_start_date + INTERVAL '2 days', project_id FROM Project;

-- 5. Task (25 entries - linked to Projects)
INSERT INTO task (task_description, task_due_date, project_id) VALUES
('Define DB Schema', '2026-01-25', 2),
('Setup Docker PG', '2026-01-28', 2),
('Build Auth Route', '2026-02-10', 2),
('Clean Dataset', '2025-09-20', 1),
('Train Model', '2025-11-15', 1),
('Circuit Design', '2025-10-20', 3),
('Assemble Frame', '2025-10-30', 3),
('Logic Coding', '2025-11-10', 3),
('Sensor Mounting', '2026-01-10', 6),
('API Integration', '2026-03-01', 15),
('Dockerize Frontend', '2026-02-15', 18),
('Security Audit', '2025-12-05', 20),
('Write Docs', '2026-05-01', 2),
('Testing Beta', '2026-04-15', 2),
('Buy Components', '2025-08-10', 5),
('Soldering', '2025-09-01', 5),
('UI Prototypes', '2025-07-15', 10),
('Collect Images', '2026-02-15', 21),
('Annotation', '2026-03-01', 21),
('Training CNN', '2026-04-01', 21),
('Final Demo', '2026-05-10', 2),
('Hardware Fix', '2025-11-25', 9),
('Battery Check', '2025-12-15', 7),
('Simulation Gazebo', '2026-01-05', 7),
('PR Review', '2026-01-30', 2);

-- 6. Junction Tables (Sample relationships)
INSERT INTO task_assignment (task_id, member_id) VALUES 
(1, 1), (2, 1), (3, 1), (4, 3), (5, 5);

INSERT INTO task_resources (task_id, resource_id) VALUES 
(6, 1), (6, 6), (7, 10), (8, 1), (15, 2);

INSERT INTO position (member_id, event_role, event_id) VALUES 
(1, 'Lead Organizer', 2), (7, 'Technical Head', 1), (13, 'Speaker', 7);

INSERT INTO task_attachment (task_id, file_name, file_url, file_type) VALUES 
(1, 'schema_v1.png', 'http://grac.storage/schema', 'image/png'),
(2, 'docker-compose.yml', 'http://grac.storage/docker', 'text/yaml');