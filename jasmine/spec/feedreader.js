/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('have URLs defined and no URL is empty', function() {
           for (var feed of allFeeds) {
             expect(feed.url).toBeDefined();
             expect(feed.url).not.toBe('');
           }
         });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have names defined and no name is empty', function() {
           for (var feed of allFeeds) {
             expect(feed.name).toBeDefined();
             expect(feed.name).not.toBe('');
           }
         });
    });


    /* Test suite about the menu. */
    describe('The menu', function() {
      /* Test that ensures the menu element is hidden by default. */
       it('is hidden by default', function() {
         expect($('body').hasClass('menu-hidden')).toBeTruthy();
       });

       /* Test that ensures the menu changes visibility when the menu icon is clicked. */
        it('changes visibility when menu icon is clicked', function() {
          expect($('body').hasClass('menu-hidden')).toBeTruthy();
          $('.menu-icon-link').trigger('click');
          expect($('body').hasClass('menu-hidden')).toBeFalsy();
          $('.menu-icon-link').trigger('click');
          expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
    });

    /* Test suite about initial entries to the feed. */
    describe('Initial Entries', function() {
      beforeEach(function(done) {
        loadFeed(0, done);
      });
      /* Test that ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       */
       it('include at least one .entry element within .feed container', function(done) {
         expect($('.feed .entry').length > 0).toBeTruthy();
         done();
       });
    });

    /* Test suite about new feed selection. */
    describe('New Feed Selection', function() {
      var oldFeed,
          newFeed;
      /* Load two different feeds and save information about each. */
      beforeEach(function(done) {
        loadFeed(0, function() {
          oldFeed = $('.feed').html();
          loadFeed(1, function() {
            newFeed = $('.feed').html();
            done();
          });
        });
      });
      /* Test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes. */
       it('changes when new feed is loaded', function(done) {
         expect(oldFeed).not.toBe(newFeed);
         done();
       });
    });
}());
