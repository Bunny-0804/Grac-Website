const getMember_id =   `SELECT member_id, password_hash 
                        FROM club_member
                        WHERE member_roll_no = ($1)`;

module.exports = {
    getMember_id
};