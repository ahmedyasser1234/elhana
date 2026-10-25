// Notifications run on the server. Never put Telegram or provider credentials in frontend code.
export const notificationsApi = {
  async sendBookingNotification() { return { success: true, handledByServer: true }; },
  async sendReviewNotification() { return { success: false, message: 'Review notifications are not configured on the server yet' }; }
};
