const redis = require('express-redis-cache');

const cache = redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
});

cache.invalidate = (name) => (req, res, next) => {
  if (!cache.connected) {
    next();
    return;
  }

  if (name) {
    cache.del(name, (err) => console.log(err));
  }

  if (req.url) {
    cache.del(req.url, (err) => console.log(err));
  }

  next();
};

cache.on('error', (error) => console.log(error));

module.exports = cache;
