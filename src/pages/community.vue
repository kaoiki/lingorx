<template>
  <div class="p-gutter max-w-7xl mx-auto px-4 md:px-gutter">
    <!-- Header -->
    <section class="mb-lg">
      <div>
        <div class="flex items-center gap-xs text-primary font-bold font-label-md mb-xs">
          <span class="material-symbols-outlined text-[18px]">groups</span>
          <span>COMMUNITY</span>
        </div>

        <h1 class="font-headline-lg text-headline-lg text-on-surface mb-xs">
          Learning Community
        </h1>

        <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          See how other learners are progressing and get inspired by daily check-ins.
        </p>
      </div>
    </section>

    <!-- Community Summary -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-lg mb-lg">
      <div class="relative overflow-hidden rounded-2xl bg-white border border-outline-variant shadow-sm p-lg">
        <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 pointer-events-none" />

        <div class="relative">
          <div class="text-primary mb-xs">
            <span class="material-symbols-outlined text-[32px]">edit_calendar</span>
          </div>

          <div class="font-headline-lg text-headline-lg text-on-surface">
            128
          </div>

          <div class="text-label-sm font-bold text-on-surface-variant">
            Check-ins Today
          </div>
        </div>
      </div>

      <div class="relative overflow-hidden rounded-2xl bg-white border border-outline-variant shadow-sm p-lg">
        <div class="absolute inset-0 bg-gradient-to-br from-secondary/5 to-tertiary/5 pointer-events-none" />

        <div class="relative">
          <div class="text-secondary mb-xs">
            <span class="material-symbols-outlined text-[32px]">local_fire_department</span>
          </div>

          <div class="font-headline-lg text-headline-lg text-on-surface">
            42
          </div>

          <div class="text-label-sm font-bold text-on-surface-variant">
            Active Streaks
          </div>
        </div>
      </div>

      <div class="relative overflow-hidden rounded-2xl bg-white border border-outline-variant shadow-sm p-lg">
        <div class="absolute inset-0 bg-gradient-to-br from-tertiary/5 to-primary/5 pointer-events-none" />

        <div class="relative">
          <div class="text-tertiary mb-xs">
            <span class="material-symbols-outlined text-[32px]">favorite</span>
          </div>

          <div class="font-headline-lg text-headline-lg text-on-surface">
            356
          </div>

          <div class="text-label-sm font-bold text-on-surface-variant">
            Encouragements
          </div>
        </div>
      </div>
    </section>

    <div class="grid grid-cols-1 xl:grid-cols-12 gap-lg">
      <!-- Main Feed -->
      <main class="xl:col-span-8 flex flex-col gap-lg">
        <!-- Check-in Notice -->
        <section class="relative overflow-hidden rounded-2xl bg-white border border-primary/20 shadow-sm">
          <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 pointer-events-none" />

          <div class="relative p-lg flex items-start gap-md">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-white text-[28px]">
                task_alt
              </span>
            </div>

            <div>
              <div class="flex items-center gap-xs text-primary font-bold text-label-sm mb-xs">
                <span>HOW CHECK-INS WORK</span>
              </div>

              <h2 class="font-headline-md text-headline-md text-on-surface mb-xs">
                Complete a lesson to post your next check-in
              </h2>

              <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Check-ins are created after finishing a lesson or learning challenge.
                This keeps the community focused on real learning progress.
              </p>
            </div>
          </div>
        </section>

        <!-- Feed Header -->
        <section>
          <div class="flex items-center justify-between mb-md">
            <h2 class="font-headline-md text-headline-md text-on-surface">
              Recent Check-ins
            </h2>

            <span class="text-label-sm font-bold text-on-surface-variant">
              {{ posts.length }} posts
            </span>
          </div>

          <div class="flex flex-col gap-md">
            <article
              v-for="post in posts"
              :key="post.id"
              class="glass-card p-lg rounded-2xl"
            >
              <div class="flex gap-md">
                <div
                  class="w-11 h-11 rounded-full bg-surface-variant border border-outline-variant flex items-center justify-center shrink-0 text-on-surface-variant"
                >
                  <span class="material-symbols-outlined text-[22px]">face</span>
                </div>

                <div class="flex-1">
                  <div class="flex flex-wrap items-center gap-xs mb-xs">
                    <span class="font-bold text-on-surface">
                      {{ post.user }}
                    </span>

                    <span class="text-label-sm text-on-surface-variant">
                      · {{ post.time }}
                    </span>

                    <span class="ml-auto px-sm py-xs rounded-full bg-primary/10 text-primary font-bold text-label-sm">
                      {{ post.course }}
                    </span>
                  </div>

                  <p class="font-body-md text-body-md text-on-surface mb-md leading-relaxed">
                    {{ post.content }}
                  </p>

                  <div class="flex items-center gap-md text-on-surface-variant">
                    <button
                      class="flex items-center gap-xs hover:text-error transition-colors cursor-pointer"
                      @click="post.likes++"
                    >
                      <span class="material-symbols-outlined text-[18px]">favorite</span>
                      <span class="text-label-sm font-bold">{{ post.likes }}</span>
                    </button>

                    <button
                      class="flex items-center gap-xs hover:text-secondary transition-colors cursor-pointer"
                      @click="post.cheers++"
                    >
                      <span class="material-symbols-outlined text-[18px]">celebration</span>
                      <span class="text-label-sm font-bold">{{ post.cheers }}</span>
                    </button>

                    <span class="text-label-sm font-bold text-on-surface-variant">
                      Lesson completed
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>

      <!-- Sidebar -->
      <aside class="xl:col-span-4 flex flex-col gap-lg">
        <!-- My Check-in Stats -->
        <section class="glass-card p-lg rounded-2xl">
          <h2 class="font-headline-md text-headline-md text-on-surface mb-lg">
            My Check-ins
          </h2>

          <div class="grid grid-cols-2 gap-md">
            <div class="rounded-xl bg-primary/5 p-md text-center">
              <div class="text-primary mb-xs">
                <span class="material-symbols-outlined text-[28px]">local_fire_department</span>
              </div>
              <div class="font-headline-md text-on-surface">7</div>
              <div class="text-label-sm font-bold text-on-surface-variant">Streak</div>
            </div>

            <div class="rounded-xl bg-secondary/5 p-md text-center">
              <div class="text-secondary mb-xs">
                <span class="material-symbols-outlined text-[28px]">calendar_month</span>
              </div>
              <div class="font-headline-md text-on-surface">18</div>
              <div class="text-label-sm font-bold text-on-surface-variant">Total</div>
            </div>
          </div>
        </section>

        <!-- Today Highlights -->
        <section class="glass-card p-lg rounded-2xl">
          <h2 class="font-headline-md text-headline-md text-on-surface mb-lg">
            Today Highlights
          </h2>

          <div class="space-y-md">
            <div class="flex items-center justify-between">
              <span class="text-on-surface-variant font-bold text-label-sm">Most active course</span>
              <span class="text-primary font-bold text-label-sm">Japanese N5</span>
            </div>

            <div class="flex items-center justify-between">
              <span class="text-on-surface-variant font-bold text-label-sm">Top streak</span>
              <span class="text-secondary font-bold text-label-sm">21 Days</span>
            </div>

            <div class="flex items-center justify-between">
              <span class="text-on-surface-variant font-bold text-label-sm">New learners</span>
              <span class="text-tertiary font-bold text-label-sm">36</span>
            </div>
          </div>
        </section>

        <!-- Future Group Preview -->
        <section class="glass-card p-lg rounded-2xl border-tertiary/20">
          <div class="text-tertiary mb-xs">
            <span class="material-symbols-outlined text-[30px]">diversity_3</span>
          </div>

          <h3 class="font-headline-md text-on-surface mb-xs">
            Study Groups
          </h3>

          <p class="font-body-md text-body-md text-on-surface-variant mb-md">
            Group learning and team check-ins are planned for future versions.
          </p>

          <span class="bg-tertiary/10 text-tertiary px-sm py-xs rounded-full font-bold text-label-sm">
            Coming Soon
          </span>
        </section>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface CommunityPost {
  id: number
  user: string
  time: string
  course: string
  content: string
  likes: number
  cheers: number
}

const posts = ref<CommunityPost[]>([
  {
    id: 1,
    user: 'Mika',
    time: '2m ago',
    course: 'Japanese N5',
    content: 'Finished today’s lesson. I finally remembered how to use basic greetings naturally.',
    likes: 12,
    cheers: 4
  },
  {
    id: 2,
    user: 'Alex',
    time: '15m ago',
    course: 'English Beginner',
    content: 'Completed Lesson 04. Daily objects are much easier after typing them a few times.',
    likes: 8,
    cheers: 3
  },
  {
    id: 3,
    user: 'Luna',
    time: '1h ago',
    course: 'Spanish A1',
    content: 'Started Spanish today. Only learned a few words, but I kept my streak.',
    likes: 15,
    cheers: 6
  },
  {
    id: 4,
    user: 'Ken',
    time: '2h ago',
    course: 'Travel English',
    content: 'Practiced airport phrases today. I feel more confident saying simple travel sentences.',
    likes: 10,
    cheers: 5
  }
])
</script>