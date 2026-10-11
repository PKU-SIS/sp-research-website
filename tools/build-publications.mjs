// Regenerate the no-JavaScript bibliography from the same content as the UI.
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const content=fs.readFileSync(path.join(root,'content.js'),'utf8');
const bibliography=vm.runInNewContext(content+'\npublicationHtml();');
const file=path.join(root,'index.html');
let html=fs.readFileSync(file,'utf8');
const markers=/<!-- publications:start -->[\s\S]*?<!-- publications:end -->/;
if(!markers.test(html))throw new Error('Publication markers missing');
html=html.replace(markers,`<!-- publications:start -->${bibliography}<!-- publications:end -->`);
fs.writeFileSync(file,html);
console.log('Bibliography refreshed from content.js');
