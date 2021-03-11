const app = require("./app");

const server = app.listen(4000, () => {
    console.log(`Server running at http://localhost:4000`);
});

module.exports = server;