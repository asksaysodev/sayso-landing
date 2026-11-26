import path from 'node:path';
import sharp from 'sharp';
import {setTimeout as holdFrame} from 'node:timers/promises';

const origin = 'http://127.0.0.1:3861';
const assets = new Set(['cdnjs.cloudflare.com','fonts.googleapis.com','fonts.gstatic.com','server.arcgisonline.com']);
const address = '4127 E Desert Lantern Ln, Phoenix, AZ 85018';
const subject = {
  id:'subject',address,source:'property record',latitude:33.5092,longitude:-111.9795,
  bedrooms:4,bathrooms:3,squareFootage:2380,yearBuilt:1998,lotSize:7800,propertyType:'Single Family',
};
const listing = {
  ...subject,id:'listing',address:'4310 E Quail Shadow Dr, Phoenix, AZ 85018',source:'listing',
  status:'Active',latitude:33.5123,longitude:-111.9753,price:879000,distance:0.32,
  squareFootage:2310,yearBuilt:2001,daysOnMarket:12,mlsNumber:'D610137',listingOffice:'Desert Lantern Realty',
};
const result = {
  subject,results:[listing],nearMisses:[],step:{radius:0.5},settings:{},notes:[],
  avm:{price:890000,level:'Medium',compCount:10,source:'RentCast'},
  logKey:'docs-fixture-search',searchedAt:new Date().toISOString(),
};
const condition = {ok:true,condition:{rating:'C3',label:'Updated',tags:['Updated kitchen','Newer flooring'],claims:[]}};

export async function captureMap(page, publicDir, output, {recordTemplates = false} = {}) {
  let searchRequests = 0;
  await page.route('**/*', async route => {
    const url = new URL(route.request().url());
    if (url.origin !== origin) {
      if (url.protocol === 'https:' && assets.has(url.hostname)) return route.continue();
      return route.abort();
    }
    if (url.pathname === '/api/places') {
      const {q,placeId} = route.request().postDataJSON();
      const suggestions = q?.startsWith('4127') ? [{id:'docs-subject',main:'4127 E Desert Lantern Ln',secondary:'Phoenix, AZ 85018'}] : [];
      return route.fulfill({json:placeId ? {address} : {suggestions}});
    }
    if (url.pathname === '/api/search') {
      searchRequests++;
      if (route.request().postDataJSON().address !== address) return route.fulfill({status:400,json:{error:'Unexpected fixture address'}});
      return route.fulfill({json:result});
    }
    if (url.pathname === '/api/condition') return route.fulfill({json:condition});
    const file = path.resolve(publicDir,'.' + (url.pathname === '/' ? '/index.html' : url.pathname));
    if (!file.startsWith(publicDir + path.sep)) return route.abort();
    try {await route.fulfill({path:file});} catch {await route.abort();}
  });
  async function shot(name, target=page, overlay) {
    await page.evaluate(async () => {
      const face = await document.fonts.load('800 24px Manrope');
      if (!face.length || face.some(font => font.status !== 'loaded')) throw Error('Map typography did not load');
    });
    let screenshot;
    const targetBox = target === page ? null : await target.boundingBox();
    if (overlay || (targetBox && name !== 'screen' && (targetBox.height < 240 || targetBox.width < 427))) {
      await target.scrollIntoViewIfNeeded();
      const panel = await target.boundingBox();
      const popover = overlay ? await overlay.boundingBox() : panel;
      if (!panel || !popover) throw Error('Capture expected a visible panel');
      const viewport = page.viewportSize();
      const left = Math.min(panel.x,popover.x)-10;
      const top = Math.min(panel.y,popover.y)-10;
      const right = Math.max(panel.x+panel.width,popover.x+popover.width)+10;
      const bottom = Math.max(panel.y+panel.height,popover.y+popover.height)+10;
      const width = Math.min(viewport.width,Math.max(427,Math.ceil(right-left)));
      const height = Math.min(viewport.height,Math.max(240,Math.ceil(bottom-top)));
      const x = Math.max(0,Math.min(viewport.width-width,Math.floor((right+left-width)/2)));
      const y = Math.max(0,Math.min(viewport.height-height,Math.floor((bottom+top-height)/2)));
      screenshot = await page.screenshot({animations:'disabled',clip:{x,y,width,height}});
    } else if (name === 'screen') {
      // Capture the section at its document position so the sticky nav stays at the top of the page.
      const clip = await target.evaluate(element => {
        const rect = element.getBoundingClientRect();
        return {x:rect.x+scrollX,y:rect.y+scrollY,width:rect.width,height:rect.height};
      });
      screenshot = await page.screenshot({animations:'disabled',fullPage:true,clip});
    } else {
      screenshot = await target.screenshot({animations:'disabled'});
    }
    const image = sharp(screenshot);
    const {width,height} = await image.metadata();
    if (width < 1280 || height < 720) throw Error('Map image below 1280×720: '+name);
    await image.webp({lossless:true}).toFile(path.join(output,name+'.webp'));
  }

  if (recordTemplates) {
    await page.goto(origin + '/#/settings');
    return recordTemplateEdit(page, shot);
  }
  await page.goto(origin);
  await page.getByRole('heading',{name:'Team access'}).waitFor();
  await shot('get-sayso-map-1',page.locator('.hero'));
  await page.getByRole('textbox',{name:'Your name'}).fill('Jamie Carter');
  await page.getByLabel('Team passcode').fill('docs-fixture');
  await page.getByRole('button',{name:'Continue'}).click();
  const search = page.getByRole('combobox',{name:'Property address'});
  await search.waitFor();
  await shot('use-sayso-map-1',page.locator('.hero'));
  await search.fill('Desert Lantern');
  await page.getByRole('button',{name:'Search',exact:true}).click();
  await page.getByText('Add city and state, or pick from the list.',{exact:true}).waitFor();
  if (searchRequests !== 0) throw Error('Incomplete Map address triggered a search');
  await search.fill('4127 E Desert Lantern');
  await page.getByRole('option',{name:/4127 E Desert Lantern/}).click();
  await page.getByRole('button',{name:'Download PDF',exact:true}).waitFor();
  await page.waitForFunction(()=>{
    const tiles = [...document.querySelectorAll('.leaflet-tile')];
    return tiles.length > 0 && tiles.every(tile =>
      tile.classList.contains('leaflet-tile-loaded') && tile.naturalWidth > 0 &&
      getComputedStyle(tile).opacity === '1'
    );
  });
  await shot('use-sayso-map-2');
  await page.getByRole('button',{name:'About this estimate'}).click();
  await page.getByRole('tooltip').getByText(/Estimation only/).waitFor();
  await shot('sayso-map-estimate',page.locator('.head-block'),page.getByRole('tooltip'));
  await page.getByRole('button',{name:'About this estimate'}).click();
  const badge = page.locator('.result:not(.is-clone)').getByRole('button',{name:'Updated',exact:true});
  await badge.click();
  await page.getByText('Updated kitchen',{exact:true}).waitFor();
  await shot('sayso-map-condition',page.locator('.result:not(.is-clone)'),page.locator('.cond-pop:visible'));
  await badge.click();
  await shot('use-sayso-map-3',page.locator('.copybox'));
  await page.getByRole('button',{name:'Email me',exact:true}).click();
  await shot('use-sayso-map-4',page.locator('#emailBox'));
  await page.getByLabel('Email these comps to').fill('jamie@example.com');
  await page.getByRole('button',{name:'Next',exact:true}).click();
  await page.getByRole('button',{name:'Yes',exact:true}).waitFor();
  await shot('sayso-map-email-confirm',page.locator('#emailBox'));
  await page.getByRole('link',{name:'Recent searches',exact:true}).click();
  await page.getByRole('link',{name:/4127 E Desert Lantern/}).waitFor();
  await shot('use-sayso-map-5',page.locator('.recent'));
  await page.getByRole('link',{name:'Filters',exact:true}).click();
  await page.getByRole('heading',{name:'Filters',exact:true}).waitFor();
  await shot('sayso-map-filters-1',page.locator('.settings').getByRole('heading',{name:'Search area'}).locator('..'));
}

async function recordTemplateEdit(page, shot) {
  const section = page.locator('section.group').filter({has:page.getByRole('heading',{name:'Text template',exact:true})});
  const buyer = section.getByRole('textbox',{name:'Buyer text template',exact:true});
  const seller = section.getByRole('textbox',{name:'Seller text template',exact:true});
  await shot('screen',section);
  await section.evaluate(element => window.scrollTo(0, element.getBoundingClientRect().top + scrollY - 80));
  await shot('poster');
  await holdFrame(650);
  const buyerBefore = await buyer.inputValue(), sellerBefore = await seller.inputValue();
  const sellerCard = section.locator('.tpl-card').filter({has:page.getByRole('textbox',{name:'Seller text template',exact:true})});
  await seller.fill('');
  await seller.pressSequentially('Here are nearby homes for ',{delay:65});
  await sellerCard.getByRole('button',{name:'Subject address',exact:true}).click();
  await holdFrame(600);
  await sellerCard.getByRole('button',{name:'Similar homes list',exact:true}).click();
  if (!(await seller.inputValue()).includes('{original}{homes}') || await buyer.inputValue() !== buyerBefore) {
    throw Error('Map templates did not update independently');
  }
  await holdFrame(850);
  await sellerCard.getByRole('button',{name:'Reset',exact:true}).click();
  if (await seller.inputValue() !== sellerBefore) throw Error('Map seller template did not reset');
  await holdFrame(800);
}
