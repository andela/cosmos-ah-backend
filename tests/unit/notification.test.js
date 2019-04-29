import { expect } from 'chai';
import { saveNotifications } from '../../src/services/notificationHandler';
import { notifyHandler } from '../../src/services/notifyFollowers';


describe('Notification functionality test', () => {
  describe('notifyHandler()', async () => {
    it('should return false when notifyHandler() is passed wrong parameters', async () => {
      const notify = await notifyHandler(null, null, null);
      expect(notify).to.equal(false);
    });
  });

  describe('saveNotifications()', async () => {
    it('should return false when saveNotifications() is passed wrong parameters or fails', async () => {
      try {
        await saveNotifications(null, null, null);
      } catch ({ name, message }) {
        expect(name).to.equal('Error');
        expect(message).to.equal('Notification save failed.');
      }
    });
  });
});
