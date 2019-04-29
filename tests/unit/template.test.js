import { expect } from 'chai';
import { compileTemplate } from '../../src/templates';

describe('Template compilation test', () => {
  describe('compileTemplate()', () => {
    it('should return compiled template', async () => {
      const compileToHTML = await compileTemplate('/mailer/test.hbs', { name: 'chike', work: 'engineer' });
      expect(compileToHTML).to.equal('<html><body><h1>chike</h1><h1>engineer</h1></body></html>');
	  expect(typeof compileToHTML).to.equal('string');
		});

		it('should return error when template is invalid', async () => {
			try {
				await compileTemplate('/mailer/test-fake.hbs', {
					name: 'chike',
					work: 'engineer',
				});
			} catch ({ name, message }) {
				expect(name).to.equal('Error');
				expect(message).to.equal(
          'Could not compile template to HTML, check source.',
        );
			}
		});
  });
});
