import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { scenarios } from './mock-data/definitions';



async function setupMocks() {
  const { injectMocks, extractScenarioFromLocation } = await import(
    'data-mocks'
  );
  // TODO make this work.
  //const { scenarios } = await import('./mock-data/definitions');

  injectMocks(scenarios, extractScenarioFromLocation(window.location));
}

async function main() {
  if (environment.production) {
    enableProdMode();
  }

  if (!environment.production) {
    await setupMocks();
  }

  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
}

main();
