ALTER TABLE club_member ADD COLUMN member_name VARCHAR(100);

UPDATE club_member SET member_name = 'Jeevan' WHERE member_id = 1;
UPDATE club_member SET member_name = 'Aditi' WHERE member_id = 2;
UPDATE club_member SET member_name = 'Rahul' WHERE member_id = 3;
UPDATE club_member SET member_name = 'Priya' WHERE member_id = 4;
UPDATE club_member SET member_name = 'Vikram' WHERE member_id = 5;
UPDATE club_member SET member_name = 'Sneha' WHERE member_id = 6;
UPDATE club_member SET member_name = 'Arjun' WHERE member_id = 7;
UPDATE club_member SET member_name = 'Kavya' WHERE member_id = 8;
UPDATE club_member SET member_name = 'Rohan' WHERE member_id = 9;
UPDATE club_member SET member_name = 'Meera' WHERE member_id = 10;
UPDATE club_member SET member_name = 'Suresh' WHERE member_id = 11;
UPDATE club_member SET member_name = 'Anjali' WHERE member_id = 12;
UPDATE club_member SET member_name = 'Varun' WHERE member_id = 13;
UPDATE club_member SET member_name = 'Nisha' WHERE member_id = 14;
UPDATE club_member SET member_name = 'Karan' WHERE member_id = 15;
UPDATE club_member SET member_name = 'Divya' WHERE member_id = 16;
UPDATE club_member SET member_name = 'Amit' WHERE member_id = 17;
UPDATE club_member SET member_name = 'Pooja' WHERE member_id = 18;
UPDATE club_member SET member_name = 'Siddharth' WHERE member_id = 19;
UPDATE club_member SET member_name = 'Riya' WHERE member_id = 20;
UPDATE club_member SET member_name = 'Deepak' WHERE member_id = 21;
UPDATE club_member SET member_name = 'Neha' WHERE member_id = 22;
UPDATE club_member SET member_name = 'Manish' WHERE member_id = 23;
UPDATE club_member SET member_name = 'Swati' WHERE member_id = 24;
UPDATE club_member SET member_name = 'Abhishek' WHERE member_id = 25;

ALTER TABLE club_member ALTER COLUMN member_name SET NOT NULL;