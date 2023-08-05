const calculateAge = (dob) => {
    const currentDate = Date.now();
    const dobDate = new Date(dob).getTime();
    const month_diff = currentDate - dobDate;
    const age_d = new Date(month_diff);
    const year = age_d.getUTCFullYear();
    return Math.abs(year - 1970);
};

module.exports = calculateAge;
