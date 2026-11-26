import fs from 'node:fs/promises';
import {discoverProduct,products,readJson} from './releases.mjs';
const repo=process.env.CAPTURE_PRODUCT;
if(!products.includes(repo)||repo==='sayso-backend')throw Error('Unknown capture target');
const data=await discoverProduct(repo,new Date(Date.now()-7*86400000).toISOString(),
 path=>readJson('https://api.github.com/repos/asksaysodev/'+repo+path,process.env.DOCS_SYNC_READ_TOKEN));
if(!/^[a-f0-9]{40}$/.test(data.liveSha))throw Error('Unverified capture source');
await fs.appendFile(process.env.GITHUB_OUTPUT,'sha='+data.liveSha+'\n');
