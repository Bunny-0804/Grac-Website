const getMember_id =   `SELECT member_id, password_hash, member_name , member_role
                        FROM club_member
                        WHERE member_roll_no = ($1)`;

const admitMember =    `INSERT INTO club_member (password_hash , member_roll_no ,  member_email , member_role , member_name) 
                        SELECT a.password_hash , a.applicant_roll_no , a.applicant_email , $1 , a.applicant_name 
                        FROM applicants a WHERE a.applicant_id = $2`;

module.exports = {
    getMember_id , 
    admitMember
};