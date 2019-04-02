export const config = {
    tcm: {
        user: {
            username: process.env.TCM_USERNAME,
            password: process.env.TCM_PASSWORD,
        },
        projectKey: 'ANT',
    },
    reportsFile: {
        JSON: 'team-city.json',
        HTML: 'team-city.html',
    },
};
