import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const [
    messages,
    adminMessages,
    bottomNavMessages,
    contactMessages,
    hobbiesMessages,
    testimonialMessages
  ] = await Promise.all([
    import(`../../messages/${locale}.json`),
    import(`../../messages/admin.${locale}.json`).catch(() => ({ default: {} })),
    import(`../../messages/bottomnav.${locale}.json`).catch(() => ({ default: {} })),
    import(`../../messages/contact.${locale}.json`).catch(() => ({ default: {} })),
    import(`../../messages/hobbies.${locale}.json`).catch(() => ({ default: {} })),
    import(`../../messages/testimonial.${locale}.json`).catch(() => ({ default: {} }))
  ]);

  return {
    locale,
    messages: {
      ...messages.default,
      admin: adminMessages.default,
      bottomnav: bottomNavMessages.default,
      contact: contactMessages.default,
      hobbies: hobbiesMessages.default,
      testimonial: testimonialMessages.default
    }
  };
});