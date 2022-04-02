//==============================================================
//  Write app version in version.ts using value from package.json
//==============================================================
const path = require('path');
const colors = require('colors/safe');
const fs = require('fs');
const appVersion = require('./package.json').version;

console.log(colors.cyan('\nRunning pre-build tasks'));

const versionFilePath = path.join(__dirname + '/projects/gos-cs/src/environments/version.ts');

const src = `export const version = '${appVersion}';
`;


console.log(colors.green(`Updating application version ${colors.yellow(appVersion)}`));
console.log(`${colors.green('Writing version module to ')}${colors.yellow(versionFilePath)}\n`);


// ensure version module pulls value from package.json
fs.writeFile(versionFilePath, src, { flat: 'w' }, function (err) {
    if (err) {
        return console.log(colors.red(err));
    }
});