const app = require('./lib/app');
const PORT = process.env.PORT || 7784;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
