import { Component, /*ViewEncapsulation,*/ ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from './shared/index';
import { AppConfig } from './shared/config/app.config';
import { OAuth2Service } from './shared/oauth2/index';
import './operators';

declare var jQuery: any;
declare var Hammer: any;

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, AboutComponent).
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
 // encapsulation: ViewEncapsulation.None,
  templateUrl: 'app.component.html',
  host: {
    '[class.nav-static]' : 'config.state["nav-static"]',
    '[class.chat-sidebar-opened]' : 'chatOpened',
    '[class.app]' : 'true',
    id: 'app'
  }
})

export class AppComponent {

  config: any;
  configFn: any;
  $sidebar: any;
  chatOpened: boolean = false;

  constructor(config: AppConfig, private el: ElementRef, private router: Router, private oAuth2: OAuth2Service) {
    console.log('Environment config', Config);
    this.config = config.getConfig();
    this.configFn = config;
   
  }
  isLogin() : boolean {
      if ( this.router.url === '/login') return true;
       if (!this.oAuth2.hasValidAccessToken()){
     
        this.router.navigate(['/login']);
        return false;
    };
    return this.router.url === '/login'
  }
  
  toggleSidebarListener(state: any): void {
    let toggleNavigation = state === 'static'
      ? this.toggleNavigationState
      : this.toggleNavigationCollapseState;
    toggleNavigation.apply(this);
    localStorage.setItem('nav-static', this.config.state['nav-static']);
  }

  toggleChatListener(): void {
    jQuery(this.el.nativeElement).find('.chat-notification-sing').remove();
    this.chatOpened = !this.chatOpened;

    setTimeout(() => {
      // demo: add class & badge to indicate incoming messages from contact
      // .js-notification-added ensures notification added only once
      jQuery('.chat-sidebar-user-group:first-of-type ' +
        '.list-group-item:first-child:not(.js-notification-added)')
        .addClass('active js-notification-added')
        .find('.fa-circle')
        .after('<span class="badge tag-danger ' +
          'pull-right animated bounceInDown">3</span>');
    }, 1000);
  }

  toggleNavigationState(): void {
    this.config.state['nav-static'] = !this.config.state['nav-static'];
    if (!this.config.state['nav-static']) {
      this.collapseNavigation();
    }
  }

  expandNavigation(): void {
    // this method only makes sense for non-static navigation state
    if (this.isNavigationStatic()
      && (this.configFn.isScreen('lg') || this.configFn.isScreen('xl'))) { return; }

    jQuery('sd-app').removeClass('nav-collapsed');
    this.$sidebar.find('.active .active').closest('.collapse').collapse('show')
      .siblings('[data-toggle=collapse]').removeClass('collapsed');
  }

  collapseNavigation(): void {
    // this method only makes sense for non-static navigation state
    if (this.isNavigationStatic()
      && (this.configFn.isScreen('lg') || this.configFn.isScreen('xl'))) { return; }

    jQuery('sd-app').addClass('nav-collapsed');
    this.$sidebar.find('.collapse.in').collapse('hide')
      .siblings('[data-toggle=collapse]').addClass('collapsed');
  }

  /**
   * Check and set navigation collapse according to screen size and navigation state
   */
  checkNavigationState(): void {
    if (this.isNavigationStatic()) {
      if (this.configFn.isScreen('sm')
        || this.configFn.isScreen('xs') || this.configFn.isScreen('md')) {
        this.collapseNavigation();
      }
    } else {
      if (this.configFn.isScreen('lg') || this.configFn.isScreen('xl')) {
        setTimeout(() => {
          this.collapseNavigation();
        }, this.config.settings.navCollapseTimeout);
      } else {
        this.collapseNavigation();
      }
    }
  }

  isNavigationStatic(): boolean {
    return this.config.state['nav-static'] === true;
  }

  toggleNavigationCollapseState(): void {
    if (jQuery('sd-app').is('.nav-collapsed')) {
      this.expandNavigation();
    } else {
      this.collapseNavigation();
    }
  }

  _sidebarMouseEnter(): void {
    if (this.configFn.isScreen('lg') || this.configFn.isScreen('xl')) {
      this.expandNavigation();
    }
  }
  _sidebarMouseLeave(): void {
    if (this.configFn.isScreen('lg') || this.configFn.isScreen('xl')) {
      this.collapseNavigation();
    }
  }

  enableSwipeCollapsing(): void {
    let swipe = new Hammer(document.getElementById('content-wrap'));
    let d = this;

    swipe.on('swipeleft', () => {
      setTimeout(() => {
        if (d.configFn.isScreen('md')) { return; }

        if (!jQuery('sd-app').is('.nav-collapsed')) {
          d.collapseNavigation();
        }
      });
    });

    swipe.on('swiperight', () => {
      if (d.configFn.isScreen('md')) { return; }

      if (jQuery('sd-app').is('.chat-sidebar-opened')) { return; }

      if (jQuery('sd-app').is('.nav-collapsed')) {
        d.expandNavigation();
      }
    });
  }

  collapseNavIfSmallScreen(): void {
    if (this.configFn.isScreen('xs')
      || this.configFn.isScreen('sm') || this.configFn.isScreen('md')) {
      this.collapseNavigation();
    }
  }

  ngOnInit(): void {

    if (localStorage.getItem('nav-static') === 'true') {
      this.config.state['nav-static'] = true;
    }

    let $el = jQuery(this.el.nativeElement);
    //this.$sidebar = $el.find('[sidebar]');
    this.$sidebar = $el.find('sidebar');

    $el.find('a[href="#"]').on('click', (e: any) => {
      e.preventDefault();
    });

    this.$sidebar.on('mouseenter', this._sidebarMouseEnter.bind(this));
    this.$sidebar.on('mouseleave', this._sidebarMouseLeave.bind(this));

    this.checkNavigationState();

    this.$sidebar.on('click', () => {
      if (jQuery('sd-app').is('.nav-collapsed')) {
        this.expandNavigation();
      }
    });

    this.router.events.subscribe(() => {
      this.collapseNavIfSmallScreen();
      window.scrollTo(0, 0);
    });

    if ('ontouchstart' in window) {
      this.enableSwipeCollapsing();
    }

    this.$sidebar.find('.collapse').on('show.bs.collapse', function(e: any): void {
      // execute only if we're actually the .collapse element initiated event
      // return for bubbled events
      if (e.target !== e.currentTarget) { return; }

      let $triggerLink = jQuery(this).prev('[data-toggle=collapse]');
      jQuery($triggerLink.data('parent'))
        .find('.collapse.in').not(jQuery(this)).collapse('hide');
    })
    /* adding additional classes to navigation link li-parent
     for several purposes. see navigation styles */
      .on('show.bs.collapse', function(e: any): void {
        // execute only if we're actually the .collapse element initiated event
        // return for bubbled events
        if (e.target !== e.currentTarget) { return; }

        jQuery(this).closest('li').addClass('open');
      }).on('hide.bs.collapse', function(e: any): void {
      // execute only if we're actually the .collapse element initiated event
      // return for bubbled events
      if (e.target !== e.currentTarget) { return; }

      jQuery(this).closest('li').removeClass('open');
    });
  }
}
