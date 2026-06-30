<template>
  <div class="min-h-screen bg-surface flex items-center justify-center p-4">
    <div class="w-full bg-white rounded-2xl shadow-xl p-xl md:p-2xl" style="max-width: 600px;">
      <div class="flex items-center gap-xs text-primary font-bold font-label-md mb-md">
        <span class="material-symbols-outlined text-[18px]">mail</span>
        <span>CONTACT</span>
      </div>
      <h1 class="font-headline-lg text-headline-lg text-on-surface mb-lg">Contact Us</h1>

      <div class="space-y-md text-sm text-on-surface-variant leading-relaxed mb-lg">
        <p>Have questions, feedback, or need help? Reach out to us:</p>
        <div class="flex items-center gap-md p-md rounded-xl bg-primary/5">
          <span class="material-symbols-outlined text-[24px] text-primary">mail</span>
          <div>
            <p class="font-bold text-on-surface">Email</p>
            <a href="mailto:support@heartbeat.cool" class="text-primary hover:underline">support@heartbeat.cool</a>
          </div>
        </div>
        <div class="flex items-center gap-md p-md rounded-xl bg-secondary/5">
          <span class="material-symbols-outlined text-[24px] text-secondary">forum</span>
          <div>
            <p class="font-bold text-on-surface">Feedback</p>
            <p>Use the Feedback button in the app footer to send us a message directly.</p>
          </div>
        </div>
      </div>

      <div class="pt-lg border-t border-outline-variant text-center">
        <router-link to="/" class="text-primary text-sm font-bold hover:underline">Back to Home</router-link>
      </div>
    </div>
  </div>
</template>
