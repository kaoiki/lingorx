<template>
  <div class="min-h-screen bg-surface flex items-center justify-center p-4">
    <div class="w-full bg-white rounded-2xl shadow-xl p-xl md:p-2xl" style="max-width: 720px;">
      <div class="flex items-center gap-xs text-primary font-bold font-label-md mb-md">
        <span class="material-symbols-outlined text-[18px]">description</span>
        <span>PRIVACY POLICY</span>
      </div>
      <h1 class="font-headline-lg text-headline-lg text-on-surface mb-lg">Privacy Policy</h1>

      <div class="space-y-md text-sm text-on-surface-variant leading-relaxed">
        <p><strong class="text-on-surface">Last updated:</strong> June 28, 2026</p>

        <section>
          <h2 class="font-bold text-on-surface mb-xs">1. Information We Collect</h2>
          <p>When you create an account, we collect your email address and nickname. We also store your learning progress, including lessons completed, XP earned, and achievements unlocked.</p>
        </section>

        <section>
          <h2 class="font-bold text-on-surface mb-xs">2. How We Use Your Information</h2>
          <p>We use your information to provide and improve the learning experience, track your progress, and personalize course recommendations. We do not sell or share your personal data with third parties.</p>
        </section>

        <section>
          <h2 class="font-bold text-on-surface mb-xs">3. Cookies</h2>
          <p>We use essential cookies to maintain your login session and remember your preferences. These cookies are necessary for the app to function. No tracking or advertising cookies are used.</p>
        </section>

        <section>
          <h2 class="font-bold text-on-surface mb-xs">4. Data Storage</h2>
          <p>Your data is stored securely on our servers. You can request deletion of your account and associated data at any time by contacting us through the app settings.</p>
        </section>

        <section>
          <h2 class="font-bold text-on-surface mb-xs">5. Contact</h2>
          <p>If you have any questions about this privacy policy, please reach out via the Feedback option in the app.</p>
        </section>
      </div>

      <div class="mt-lg pt-lg border-t border-outline-variant text-center">
        <router-link to="/" class="text-primary text-sm font-bold hover:underline">Back to Home</router-link>
      </div>
    </div>
  </div>
</template>
