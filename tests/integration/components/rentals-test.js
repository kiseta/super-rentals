import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | rentals', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.setProperties({
      rentals: [
        {
          id: 'grand-old-fortress',
          title: 'Grand Old Fortress',
          owner: 'Veruca Salt',
          city: 'San Francisco',
          location: {
            lat: 37.7749,
            lng: -122.4194,
          },
          category: 'Estate',
          type: 'Standalone',
          bedrooms: 15,
          image:
            'https://images.pexels.com/photos/1590882/pexels-photo-1590882.jpeg',
          description:
            'This grand old fortress sits on over 100 acres of rolling hills and dense redwood forests.',
        },
        {
          id: 'urban-stronghold',
          title: 'Urban Stronghold',
          owner: 'Mike Teavee',
          city: 'Seattle',
          location: {
            lat: 47.6062,
            lng: -122.3321,
          },
          category: 'Condo',
          type: 'Community',
          bedrooms: 1,
          image:
            'https://upload.wikimedia.org/wikipedia/commons/2/20/Hunyad_Castle_TB1.jpg',
          description:
            'A commuters dream. This rental is within walking distance of 2 bus stops and the Metro.',
        },
        {
          id: 'downtown-citadel',
          title: 'Downtown Citadel',
          owner: 'Yedikule Dungeons',
          city: 'Istanbul',
          location: {
            lat: 40.9937,
            lng: 28.9227,
          },
          category: 'Apartment',
          type: 'Community',
          bedrooms: 3,
          image:
            'https://images.pexels.com/photos/7492125/pexels-photo-7492125.jpeg',
          description:
            'Convenience is at your doorstep with this charming downtown rental. Great restaurants and active night life are within a few feet.',
        },
      ],
    });
  });

  test('it renders all given rental properties by default', async function (assert) {
    await render(hbs`<Rentals @rentals={{this.rentals}} />`);

    assert.dom('.rentals').exists();
    assert.dom('.rentals input').exists();

    assert.dom('.rentals .results').exists();
    assert.dom('.rentals .results li').exists({ count: 3 });

    assert
      .dom('.rentals .results li:nth-of-type(1)')
      .containsText('Grand Old Fortress');

    assert
      .dom('.rentals .results li:nth-of-type(2)')
      .containsText('Urban Stronghold');

    assert
      .dom('.rentals .results li:nth-of-type(3)')
      .containsText('Downtown Citadel');
  });

  test('it updates the results according to the search query', async function (assert) {
    await render(hbs`<Rentals @rentals={{this.rentals}} />`);

    assert.dom('.rentals').exists();
    assert.dom('.rentals input').exists();

    await fillIn('.rentals input', 'Stronghold');

    assert.dom('.rentals .results').exists();
    assert.dom('.rentals .results li').exists({ count: 1 });
    assert.dom('.rentals .results li').containsText('Urban Stronghold');

    await fillIn('.rentals input', 'Fortress');

    assert.dom('.rentals .results').exists();
    assert.dom('.rentals .results li').exists({ count: 1 });
    assert.dom('.rentals .results li').containsText('Grand Old Fortress');

    await fillIn('.rentals input', 'Citadel');

    assert.dom('.rentals .results').exists();
    assert.dom('.rentals .results li').exists({ count: 1 });
    assert.dom('.rentals .results li').containsText('Downtown Citadel');
  });
});
