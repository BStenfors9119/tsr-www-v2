import { expect } from 'chai';
import { renderHome } from './home.pres.js';

const props = {
  headline: 'Change the channel. Faster.',
  subhead: 'Sub headline',
  ctaLabel: 'See products',
  testimonials: [
    { quote: 'Great tool', author: 'A Customer' },
    { quote: 'Loved it', author: 'Another Customer' },
  ],
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

  it('renders each testimonial quote and author', () => {
    const html = renderHome(props);
    props.testimonials.forEach((t) => {
      expect(html).to.include(t.quote);
      expect(html).to.include(t.author);
    });
  });

  it('renders a dot per testimonial when there is more than one', () => {
    const html = renderHome(props);
    const matches = html.match(/class="testimonials__dot[ "]/g) ?? [];
    expect(matches.length).to.equal(props.testimonials.length);
  });

  it('falls back to legacy quote/quoteAuthor when no testimonials are provided', () => {
    const html = renderHome({
      ...props,
      testimonials: undefined,
      quote: 'Legacy quote',
      quoteAuthor: 'Legacy Author',
    });
    expect(html).to.include('Legacy quote');
    expect(html).to.include('Legacy Author');
  });
});
