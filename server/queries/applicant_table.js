const applytoJoin = 'INSERT INTO applicants (password_hash , applicant_roll_no , applicant_email , applicant_name) VALUES (($1) , ($2) , ($3) , ($4))';

module.exports = {
    applytoJoin
};