//
// For guidance on how to create filters see:
// https://prototype-kit.service.gov.uk/docs/filters
//

const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter

// Add your filters here

//Date filter to cover xx to xx
addFilter('dateRangeYearsAgo', (_, fromYearsAgo, toYearsAgo) => {
    const today = new Date();

    const fromDate = new Date(today);
    fromDate.setFullYear(today.getFullYear() - fromYearsAgo);

    const toDate = new Date(today);
    toDate.setFullYear(today.getFullYear() - toYearsAgo);

    function format(date) {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    }

    return {
        from: format(fromDate),
        to: format(toDate)
    };
});

//30 days ago filter
addFilter('dateMinusDays', (_, daysToSubtract) => {
    const today = new Date();

    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - daysToSubtract);

    const day = pastDate.getDate();
    const month = pastDate.getMonth() + 1;
    const year = pastDate.getFullYear();

    return `${day} ${month} ${year}`;
});








