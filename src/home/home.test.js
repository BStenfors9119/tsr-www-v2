import { expect } from 'chai';
import { renderHome } from './home.pres.js';

const props = {
  headline: 'Change the channel. Faster.',
  subhead: 'Sub headline',
  ctaLabel: 'See products',
  quote: 'Great tool',
  quoteAuthor: 'A Customer',
  features: [
    { title: 'Group your TVs', body: 'Organize TVs by section.' },
    { title: 'Schedule games', body: 'Plan ahead.' },
  ],
};

describe('home pres', () => {
  it('renders the headline', () => {
    const html = renderHome(props);
    expect(html).to.include('Change the channel. Faster.');
  });

  it('renders the CTA label', () => {
    const html = renderHome(props);
    expect(html).to.include('See products');
  });

  it('renders each feature title', () => {
    const html = renderHome(props);
    props.features.forEach((f) => {
      expect(html).to.include(f.title);
    });
  });
});
