import 'babel-polyfill';
import { ArgumentParser } from 'argparse';
import phantom from 'phantom';
import util from 'util';

const parser = new ArgumentParser({
    version: '0.0.1',
    addHelp: true,
    description: 'The fucking legend'
});
parser.addArgument(
    ['-f', '--file'],
    {
        help: 'le html de la pub',
        defaultValue: 'index.html'
    }
);
parser.addArgument(
    ['-q', '--quality'],
    {
        help: 'la qualité de la capture',
        defaultValue: 1
    }
);
parser.addArgument(
    ['-o', '--output'],
    {
        help: 'le fichier de capture',
        defaultValue: "capture.jpg"
    }
);
const args = parser.parseArgs();

const instanceP = phantom.create();
const pageP = instanceP.then(instance => instance.createPage());
const opennedPageP = pageP.then(page => page.open(args.file).then(() => page));
opennedPageP.then(openPage => openPage.render(args.output, {quality: args.quality})).catch(err => console.error(err)).then(() => process.exit());