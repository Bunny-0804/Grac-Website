const applytoJoin = 'INSERT INTO applicants (password_hash , applicant_roll_no , applicant_email , applicant_name , domain , application_url) VALUES ($1 , $2 , $3 , $4 , $5 , $6)';

const viewApplicants = `SELECT applicant_roll_no , applicant_email , applicant_name , domain , application_url , application_time_stamp  FROM applicants WHERE status = 'pending' ORDER BY application_time_stamp ASC `;

const setStatus = `UPDATE applicants SET status = 'accepted' WHERE applicant_id = $1`;
const deleteApplicant = `DELETE FROM applicants WHERE applicant_id  = $1`;

module.exports = {
    applytoJoin ,
    viewApplicants ,
    setStatus ,
    deleteApplicant
};