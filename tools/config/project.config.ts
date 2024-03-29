import { join } from 'path';

import { SeedConfig } from './seed.config';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  constructor() {
    super();
    // this.APP_TITLE = 'Put name of your app here';

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      {src: 'tether/dist/js/tether.min.js', inject: 'libs'},
      {src: 'moment/min/moment-with-locales.min.js', inject: 'libs'},
      {src: 'bootstrap/dist/js/bootstrap.min.js', inject: 'libs'},
      {src: 'jquery-slimscroll/jquery.slimscroll.min.js', inject: 'libs'},
      {src: 'hammerjs/hammer.min.js', inject: 'libs'},
      {src: 'datatables.net/js/jquery.dataTables.js', inject: 'libs'},
      {src: 'datatables.net-bs/js/dataTables.bootstrap.js', inject: 'libs'},
      {src: 'datatables.net-bs/css/dataTables.bootstrap.css', inject: true},
      {src: 'datatables.net-buttons/js/dataTables.buttons.js', inject: 'libs'},
      {src: 'datatables.net-buttons/js/buttons.colVis.js', inject: 'libs'},
      {src: 'datatables.net-buttons/js/buttons.flash.js', inject: 'libs'},
      {src: 'datatables.net-buttons/js/buttons.html5.js', inject: 'libs'},
      {src: 'datatables.net-buttons/js/buttons.print.js', inject: 'libs'},
      {src: 'datatables.net-buttons-bs/js/buttons.bootstrap.js', inject: 'libs'},
      {src: 'datatables.net-buttons-bs/css/buttons.bootstrap.css', inject: true},
      {src: 'datatables.net-responsive/js/dataTables.responsive', inject: 'libs'},
      {src: 'datatables.net-responsive-bs/js/responsive.bootstrap.js', inject: 'libs'},
      {src: 'datatables.net-responsive-bs/css/responsive.bootstrap.css', inject: true},
      // 
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      ...this.APP_ASSETS,
      // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
      // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
    ];

    this.SYSTEM_CONFIG_DEV.paths['firebase'] =
      `${this.APP_BASE}node_modules/firebase/firebase`;
    /*this.SYSTEM_CONFIG_DEV.paths['angularfire2'] =
      `${this.APP_BASE}node_modules/angularfire2/angularfire2`;*/

    this.SYSTEM_BUILDER_CONFIG.packages['firebase'] = {
        main: 'firebase.js',
        defaultExtension : 'js'
    };
    this.SYSTEM_BUILDER_CONFIG.packages['angularfire2'] = {
        main: 'angularfire2.js',
        defaultExtension : 'js'
    };
    /* Add to or override NPM module configurations: */
    // this.mergeObject(this.PLUGIN_CONFIGS['browser-sync'], { ghostMode: false });
  }

}
