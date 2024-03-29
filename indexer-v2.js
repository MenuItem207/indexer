const add = require('./src-v2/args/add');
const find = require('./src-v2/args/find');
const update = require('./src-v2/args/update');
const migrateLegacy = require('./src-v2/args/migrate-legacy');

console.log('\n\nIndexer\n---------------\n');

// assign first arg
let argv = process.argv;
let arg_one = '';
if (argv.length > 2) { // has args
    arg_one = argv[2];
}

switch (arg_one) {
    case 'add':
        add(argv);
        break;
    case 'update':
        update(argv);
        break;
    case 'find':
        find(argv);
        break;
    case 'migrate-legacy':
        migrateLegacy();
        break;
    default:
        console.log('You didn\'t pass in any arguments. Try running \'npm start\' with some of these:\n\nadd            - add a new translation | i.e npm start add \"new translation\"\n\nfind           - find existing translations\n\nupdate         - update translations | i.e npm start update\n\nmigrate-legacy - convert legacy obj to json (check readme) | i.e npm start migrate-legacy\n');
        break;
}