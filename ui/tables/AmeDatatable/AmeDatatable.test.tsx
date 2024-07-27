import { render, screen } from '@/test-utils';
import { AmeDatatable } from './AmeDatatable';

describe('AmeDatatable component', () => {
  it('has correct Next.js theming section link', () => {
    render(<AmeDatatable />);
    expect(screen.getByText('this guide')).toHaveAttribute(
      'href',
      'https://mantine.dev/guides/next/'
    );
  });
});
