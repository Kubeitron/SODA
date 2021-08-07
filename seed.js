const fs = require('fs');
const $faker = require('faker');

const allItems = [];
const clusterOptions = require('./assets/data/clusters.json');
const encryptionOptions = require('./assets/data/encryptionType.json');
const insecureOptions = require('./assets/data/insecureTraffic.json');
for(let i = 0; i < 3000; i++) {
  const item = {
    uuid:  $faker.datatype.uuid(),
    cluster: clusterOptions[Math.round(Math.random() * 2)],
    namespace:  $faker.datatype.uuid().substring(0, 8),
    routeName:  $faker.company.companyName(),
    routeHost:  $faker.internet.domainName(),
    certHash:  $faker.datatype.hexaDecimal(),
    wildcard:  $faker.datatype.boolean() === 'true',
    certCreatedOn:  $faker.date.past(),
    certExpiresOn:  $faker.date.future(),
    certSans: [
      $faker.internet.domainName(),
      $faker.internet.domainName(),
      $faker.internet.domainName()
    ],
    encryptionType:  encryptionOptions[Math.round(Math.random()*2)],
    insecureTraffic: insecureOptions[Math.round(Math.random()*2)],
  };
  allItems.push(item);
}

const jsonContent = JSON.stringify(allItems);

fs.writeFile("assets/data/routes.json", jsonContent, 'utf8', function (err) {
  if (err) {
    console.log("An error occured while writing JSON Object to File.");
    return console.log(err);
  }

  console.log("JSON file has been saved.");
});