Ractive.components['ux-accordion'] = Ractive.extend({

	template: Ractive.defaults.templates['ux-accordion'],

	isolated: true,

	computed: {
		guid: function () {
			return this._guid;
		}
	},

	oninit: function () {

		this.set('componentItems', this.findAllChildComponents('ux-accordionitem'));

		this.on('*.changeAccordion', function (srcItem) {

			_.each(this.get('componentItems'), function (component) {

				// Is this the item the user clicked on?
				if (component._guid === srcItem._guid) {

					// Support open and close behaviours with repeated clicking by User.
					component.toggle('active');

				} else {

					// Not where the User clicked, so close it (if open).
					component.set('active', false);

				}

			});

		});

	}

});

Ractive.components['ux-accordionitem'] = Ractive.extend({

	template: Ractive.defaults.templates['ux-accordionitem'],

	isolated: true,

	computed: {
		guid: function () {
			return this._guid;
		}
	},

	oninit: function () {

		var anchorComponent = this.findComponent('ux-anchor');
		var contentComponent = this.findComponent('ux-content');

		// Link the anchor to the content by the content's id for nice html.
		anchorComponent.set({
			href: '#' + contentComponent._guid
		});

		contentComponent.set({
			active: this.get('active') || false
		});

		// Listen for click event on accordion title element, and then fire a semantic event for accordion.
		anchorComponent.on('anchorClicked', function (e) {
			this.fire('changeAccordion', this);
			return false;
		}.bind(this));

		this.set({
			contentComponent: contentComponent,
			initialized: true
		});

	},

	onchange: function () {

		if (!this.get('initialized')) {
			// Not ready yet for onchange.
			return;
		}

		this.get('contentComponent').set({
			active: this.get('active')
		});

	}

});

Ractive.components['ux-alert'] = Ractive.extend({
	template: Ractive.defaults.templates['ux-alert'],
	oninit: function (options) {
		this.on('closeClicked', function() {
			this.teardown();
			return false;
		});
	}
});
Ractive.components['ux-anchor'] = Ractive.extend({
	template: Ractive.defaults.templates['ux-anchor'],
	isolated: true,
	computed: {
		guid: function () {
			return this._guid;
		}
	}
});

Ractive.components['ux-button'] = Ractive.extend({
	template: Ractive.defaults.templates['ux-button'],
	isolated: true,
	clickHandler: function () {

		// if a click event is specified propagate the click event
		if (this.get('onclick')) {
			console.log('Firing event');
			this.fire(this.get('onclick'), this);
		}

		// prevent bubbling
		return true;
	}
});

Ractive.components['ux-col'] = Ractive.extend({
	template: Ractive.defaults.templates['ux-col'],
	isolated: true
});

Ractive.components['ux-content'] = Ractive.extend({
	template: Ractive.defaults.templates['ux-content'],
	isolated: true,
	computed: {
		guid: function () {
			return this._guid;
		}
	}
});

Ractive.components['ux-header'] = Ractive.extend({
	template: Ractive.defaults.templates['ux-header'],
	isolated: true,
	data: function () {
		return {
			level: 1
		};
	}
});

Ractive.components['ux-iconbar'] = Ractive.extend({

	getUpNumClass: function (num) {

		var supportedWords = [
			'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'
		];

		if (!supportedWords[num]) {
			//console.error('ux-iconbar#numberToWord: num NOT supported: ' + num);
			return '';
		}

		return supportedWords[num] + '-up';

	},

	template: Ractive.defaults.templates['ux-iconbar'],

	isolated: true,

	data: {

		getItemData: function (itemData) {
			// Nothing needs to be mapped, but we don't want parent data leaking down.
			return itemData;
		}

	},

	computed: {

		/**
		* TODO Move to generic helpers location?
		* @returns {string} The number of child items as a css class, e.g. "one-up", "three-up", etc.
		*/
		upNumClass: function () {

			var items = this.get('items');

			if (!items) {
				return '';
			}

			// Data-driven component has items data.
			return this.getUpNumClass(items.length);

		}

	},

	oninit: function () {

		// Only needed for markup mode.
		if (!this.get('isDataModel')) {
			var itemComponents = this.findAllChildComponents('ux-iconbaritem');
			var cssClass = this.get('class') || '';
			this.set('class', cssClass + ' ' + this.getUpNumClass(itemComponents.length));
		}

	}

});

Ractive.components['ux-iconbaritem'] = Ractive.extend({

	template: Ractive.defaults.templates['ux-iconbaritem'],

	isolated: true,

	computed: {
		guid: function () {
			return this._guid;
		}
	}

});

Ractive.components['ux-keystrokes'] = Ractive.extend({
	isolated: true,
	template: Ractive.defaults.templates['ux-keystrokes']
});

Ractive.components['ux-label'] = Ractive.extend({
	isolated: true,
	template: Ractive.defaults.templates['ux-label']
});

Ractive.components['ux-li'] = Ractive.extend({
	template: Ractive.defaults.templates['ux-li'],
	isolated: true
});

Ractive.components['ux-off-canvas'] = Ractive.extend({

	template: Ractive.defaults.templates['ux-off-canvas'],

	isolated: true,

	data: function () {
		return {
			expandedState: '',
			leftItems: [],
			rightItems: [],
			mainContent: ''
		};
	},

	computed: {

		/**
		 * @returns {string} CSS class: left = move-right or right = move-left.
		 */
		getExpandedClass: function () {

			// Default is empty string for no css class.
			var classMap = {
				'left': 'move-right',
				'right': 'move-left'
			};

			return classMap[this.get('expandedState')] || '';

		}

	},

	oninit: function () {

		// You can expand from left or right, or none. Can't do both at the same time.
		this.on('updateMenu', function (event, direction) {
			this.set('expandedState', direction);
		});

	}

});

Ractive.components['ux-off-canvas-list'] = Ractive.extend({
	template: Ractive.defaults.templates['ux-off-canvas-list'],
	isolated: true
});

Ractive.components['ux-orbit'] = Ractive.extend({

	template: Ractive.defaults.templates['ux-orbit'],

	isolated: true,

	data: {
		currentPage: 1,
		navigation_arrows: true,
		slide_number: true,
		bullets: true
	},

	computed: {
		currentPageCssClass: function () {
			return 'currentPage' + this.get('currentPage');
		}
	},

	oninit: function () {

		this.on('nextPage', function (e) {
			var nextPage = this.get('currentPage') + 1,
				slideTotal = this.get('slidesTotal');

			nextPage = nextPage > slideTotal ? slideTotal : nextPage;
			this.set('currentPage', nextPage);
			return false;
		});

		this.on('prevPage', function (e) {
			var prevPage = this.get('currentPage') -1 ;
			// FIXME Quick hack for bounds.
			prevPage = prevPage < 1 ? 1 : prevPage;
			this.set('currentPage', prevPage);
			return false;
		});

	},

	oncomplete: function () {
		var slidesTotal = this.findAll('.orbit-slides-slide').length;
		this.set('slidesTotal', slidesTotal);
	}

});

Ractive.components['ux-panel'] = Ractive.extend({
	template: Ractive.defaults.templates['ux-panel'],
	isolated: true
});

Ractive.components['ux-pricingtable'] = Ractive.extend({
	template: Ractive.defaults.templates['ux-pricingtable'],
	isolated: true,
	oninit: function () {

		this.on('buyNow', function (syntheticEvent) {

			if (!syntheticEvent.context.status || 'buynow' === syntheticEvent.context.status) {
				return;
			}

			// Else - it's in a disabled state, so stop the browser's default action for an anchor.
			syntheticEvent.original.preventDefault();

		});

	}
});

Ractive.components['ux-progress'] = Ractive.extend({
	template: Ractive.defaults.templates['ux-progress'],
	isolated: true,
	computed: {
		meterStyle: function () {
			return 'width: ' + (this.get('value') || '0') + '%';
		}
	}
});

Ractive.components['ux-row'] = Ractive.extend({
	template: Ractive.defaults.templates['ux-row'],
	isolated: true
});

Ractive.components['ux-sidenav'] = Ractive.extend({
	template: Ractive.defaults.templates['ux-sidenav'],
	isolated: true
});

Ractive.components['ux-tabarea'] = Ractive.extend({

	template: Ractive.defaults.templates['ux-tabarea'],

	isolated: true,

	oninit: function () {

		var tabLinks = this.findComponent('ux-tablinks');
		var tabPanes = this.findComponent('ux-tabpanes');

		if (!tabLinks || !tabPanes) {
			// Because datamodel driven components can trigger this too early?
			return;
		}

		var tabLink = tabLinks.findAllChildComponents('ux-tablink');
		var tabPane = tabPanes.findAllChildComponents('ux-tabpane');

		_.each(tabLink, function (link, i) {
			var childPane = tabPane[i];
			if (childPane) {
				link.set({
					tabPane: childPane,
					uid: link._guid
				});
			}
		});
	}

});

Ractive.components['ux-tablink'] = Ractive.extend({
	template: Ractive.defaults.templates['ux-tablink'],
	components: Ractive.components,
	isolated: true,
	oninit: function () {
		var active = this.get('active') || false;
		var tabPane = this.get('tabPane') || null;

		if (tabPane) {
			tabPane.set('active', active);
		}
	}
});

Ractive.components['ux-tablinks'] = Ractive.extend({
	template: Ractive.defaults.templates['ux-tablinks'],
	isolated: true,
	oninit: function () {

		// Defensive code for isomorphic execution.
		if (typeof window !== 'undefined') {
			// If there is a hash. We want to check deeplinking.
			if (window.location.hash.length) {
				var hash = window.location.hash.substr(1);
				var components = this.findAllChildComponents('ux-tablink');

				var hasMatchingHash = _.filter(components, function (component) {
					return component.get('id') === hash;
				});

				if (hasMatchingHash.length) {
					_.each(components, function (component) {
						var isActive = component.get('id') === hash;
						component.set('active', isActive);
						component.get('tabPane').set('active', isActive);
					});
				}

			}
		}

		this.on('*.changeTab', function (event) {

			/**
			 * This currently doesnt work.
			 * @see https://github.com/ractive-foundation/ractive-foundation/issues/122
			 */
			event.original.preventDefault();

			var components = this.findAllChildComponents('ux-tablink');

			_.each(components, function (component) {
					var isActive = component._guid === event.context.uid;
					component.set('active', isActive);
					component.get('tabPane').set('active', isActive);
			});

			return false;
		});
	}
});

Ractive.components['ux-tabpane'] = Ractive.extend({

	template: Ractive.defaults.templates['ux-tabpane'],

	isolated: true

});

Ractive.components['ux-tabpanes'] = Ractive.extend({
	template: Ractive.defaults.templates['ux-tabpanes'],
	isolated: true
});

Ractive.components['ux-thumbnail'] = Ractive.extend({
	template: Ractive.defaults.templates['ux-thumbnail']
});

Ractive.components['ux-top-bar'] = Ractive.extend({

	template: Ractive.defaults.templates['ux-top-bar'],

	isolated: true,

	oninit: function () {

		var self = this;

		this.on('toggleMenu', function(e) {

			if (self.get('isexpanded')) {
				self.set('isexpanded', false);
			} else {
				self.set('isexpanded', true);
			}

			return false;

		});

	},

	oncomplete: function () {

		// Defensive code for isomorphic execution.
		if (typeof window !== 'undefined') {

			var self = this;
			var topbar = self.find('.top-bar');
			var topbarOffset = self.elementOffset(topbar);

			window.addEventListener('scroll', function (e) {
				if (self.get('issticky')) {
					self.set('isfixed', self.pageYOffset() > topbarOffset.top);
				}
			});

		}

	}

});

Ractive.components['ux-top-bar-items'] = Ractive.extend({
	template: Ractive.defaults.templates['ux-top-bar-items'],
	isolated: true,
	data: {
		getTopBarItemCssClass: function (item) {
			var classes = [];
			if (item.active) {
				classes.push('active');
			}
			if (item.hasForm) {
				classes.push('has-form');
			}
			if (item.items && item.items.length > 0) {
				// Note: not-click needed for focus/hover with html class=js. Silly.
				classes.push('has-dropdown not-click');
			}
			return classes.join(' ');
		}
	}
});
