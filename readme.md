### installation

```
sudo npm -g install forever
git clone https://github.com/border-radius/diplomas
cd diplomas
npm install
cd node_modules/geoip-lite
npm run updatedb
cd ../..
forever start bin/www
```