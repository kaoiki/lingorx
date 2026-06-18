# 语言学习游戏 MVP 前端开发笔记
## 一、前端定位
前端负责：

+ 用户注册 / 登录
+ 课程展示
+ Lesson 选择
+ Typing Battle 游戏体验
+ 游戏结算提交
+ 学习统计展示
+ 成就展示
+ 学习动态展示
+ AI Practice Coming Soon 页面

后端使用 Supabase，前端通过 Supabase Client 调用 Auth、Database、RPC。

---

# 二、前端技术栈
## 核心技术
+ Vue 3
+ Nuxt UI
+ Tailwind CSS
+ Vercel

## 数据交互
+ Supabase JS Client
+ Supabase Auth
+ Supabase RPC
+ Supabase Storage，可选

---

# 三、前端核心模块
## 1. 用户模块
### 页面
+ `/login`
+ `/register`
+ `/profile`

### 功能
+ 注册
+ 登录
+ 登出
+ 获取当前用户
+ 获取 profile
+ 展示等级、经验、金币、连续学习天数

### 前端状态
建议维护：

```typescript
user
profile
session
isLoggedIn
```

---

## 2. 课程模块
### 页面
+ `/courses`
+ `/courses/:courseId`
+ `/lessons/:lessonId`

### 功能
+ 展示课程列表
+ 展示课程详情
+ 展示章节列表
+ 展示 lesson 列表
+ 展示 lesson 完成状态
+ 进入 Typing Battle

### 数据来源
读取后端：

+ courses
+ chapters
+ lessons
+ user_lesson_progress

---

## 3. Typing Battle 游戏模块
### 页面
+ `/play/:lessonId`

### 功能
+ 读取当前 lesson 的 units
+ 根据 unit_type 显示题目
+ 用户输入答案
+ 判断正确 / 错误
+ 怪物血量变化
+ 分数变化
+ 当前进度变化
+ 游戏结束后生成结算数据
+ 调用 `submit_lesson_result`

### MVP 支持 Unit
```latex
vocabulary
translation
```

### 后续扩展 Unit
```latex
tense
dictation
```

---

## 4. 游戏结算模块
### 页面
+ 游戏结束弹窗
+ 或 `/result/:recordId`

### 前端提交内容
```typescript
lesson_id
score
correct_count
wrong_count
enemy_kill_count
word_input_count
study_seconds
```

### 调用方式
建议前端只调用一个后端 RPC：

```typescript
submit_lesson_result
```

不要在前端分别写入多张表。

---

## 5. 学习统计模块
### 页面
+ `/stats`
+ `/profile`

### 功能
展示：

+ 总学习时长
+ 总完成 lesson 数
+ 总击败敌人数
+ 总输入词数
+ 总正确数
+ 总错误数
+ 连续学习天数
+ 今日学习状态

### 数据来源
读取：

+ profiles
+ user_stats
+ user_lesson_records

---

## 6. 成就模块
### 页面
+ `/achievements`

### 功能
+ 展示所有成就
+ 展示已解锁状态
+ 展示解锁时间
+ 游戏结算后弹出新成就提示

### 数据来源
读取：

+ achievements
+ user_achievements

---

## 7. 轻社交模块
### 页面
+ `/feed`

### 功能
+ 展示学习动态
+ 展示用户昵称和头像
+ 点赞
+ 取消点赞
+ 显示点赞数量

### 数据来源
读取：

+ activities
+ activity_likes
+ profiles

---

## 8. AI 预告模块
### 页面
+ `/ai-practice`

### 功能
第一版只展示：

```latex
AI Practice Coming Soon
```

不接入真实 AI。

---

# 四、前端页面清单
## P0 页面
+ `/login`
+ `/register`
+ `/`
+ `/courses`
+ `/courses/:courseId`
+ `/play/:lessonId`

## P1 页面
+ `/profile`
+ `/stats`
+ `/achievements`
+ `/feed`

## P2 页面
+ `/ai-practice`

---

# 五、前端目录建议
```latex
src/
├── components/
│   ├── auth/
│   ├── course/
│   ├── game/
│   ├── profile/
│   ├── achievement/
│   └── feed/
├── pages/
│   ├── index.vue
│   ├── login.vue
│   ├── register.vue
│   ├── courses/
│   │   ├── index.vue
│   │   └── [courseId].vue
│   ├── play/
│   │   └── [lessonId].vue
│   ├── profile.vue
│   ├── stats.vue
│   ├── achievements.vue
│   ├── feed.vue
│   └── ai-practice.vue
├── composables/
│   ├── useAuth.ts
│   ├── useProfile.ts
│   ├── useCourses.ts
│   ├── useTypingBattle.ts
│   ├── useStats.ts
│   ├── useAchievements.ts
│   └── useFeed.ts
├── lib/
│   └── supabase.ts
└── types/
    ├── course.ts
    ├── game.ts
    ├── profile.ts
    ├── achievement.ts
    └── feed.ts
```

---

# 六、核心 Composables 设计
## useAuth
负责：

+ 注册
+ 登录
+ 登出
+ 获取 session
+ 获取 user

## useProfile
负责：

+ 获取当前用户 profile
+ 刷新等级、经验、金币、连续天数

## useCourses
负责：

+ 获取课程列表
+ 获取课程详情
+ 获取章节
+ 获取 lessons
+ 获取 lesson units

## useTypingBattle
负责：

+ 初始化游戏
+ 当前题目
+ 输入判断
+ 怪物血量
+ 分数
+ 正确数
+ 错误数
+ 游戏结算
+ 调用 submit_lesson_result

## useStats
负责：

+ 获取 user_stats
+ 获取近期学习记录

## useAchievements
负责：

+ 获取成就列表
+ 获取用户已解锁成就
+ 游戏结算后展示新成就

## useFeed
负责：

+ 获取动态列表
+ 点赞
+ 取消点赞

---

# 七、Typing Battle 前端流程
## 进入游戏
```latex
读取 lessonId
        ↓
请求 lesson units
        ↓
初始化游戏状态
        ↓
显示第一个 unit
```

## 游戏中
```latex
显示 prompt
        ↓
用户输入 answer
        ↓
前端判断正确 / 错误
        ↓
正确：攻击敌人
        ↓
错误：扣血或提示错误
        ↓
进入下一题
```

## 游戏结束
```latex
计算 score
        ↓
计算 correct_count
        ↓
计算 wrong_count
        ↓
计算 enemy_kill_count
        ↓
计算 word_input_count
        ↓
计算 study_seconds
        ↓
调用 submit_lesson_result
        ↓
展示结算弹窗
        ↓
刷新 profile / stats / achievements
```

---

# 八、游戏 UI 设计
## Typing Battle 页面结构
```latex
顶部：
课程名 / Lesson 名 / 进度

中间：
敌人图像
敌人血条
当前题目

下方：
输入框
提示
技能 / 道具预留位

底部：
正确数 / 错误数 / 分数
```

## MVP 动效
只保留轻动效：

+ 正确时敌人受击
+ 错误时输入框抖动
+ 敌人血量减少
+ 结算弹窗弹出

不要做复杂战斗动画。

---

# 九、移动端适配重点
Typing Battle 必须兼容手机。

重点处理：

+ 输入框自动聚焦
+ 键盘弹出后的布局
+ 按钮足够大
+ 游戏区域不要被键盘遮挡
+ 横屏不作为 MVP 必须项
+ 优先竖屏体验

---

# 十、前端开发路线
## 第 1 周：项目初始化与用户系统
### 目标
完成前端基础框架和登录注册。

### 开发内容
+ 创建 Vue 3 项目
+ 配置 Nuxt UI
+ 配置 Tailwind CSS
+ 配置 Supabase Client
+ 配置环境变量
+ 创建基础 Layout
+ 创建登录页
+ 创建注册页
+ 创建首页
+ 创建 `useAuth`
+ 创建 `useProfile`

### 完成标准
+ 用户可以注册
+ 用户可以登录
+ 登录后进入首页
+ 首页能显示用户昵称、等级、金币

---

## 第 2 周：课程浏览系统
### 目标
完成课程选择到 lesson 进入流程。

### 开发内容
+ 创建课程列表页
+ 创建课程详情页
+ 创建章节组件
+ 创建 lesson 卡片组件
+ 创建 `useCourses`
+ 读取 courses
+ 读取 chapters
+ 读取 lessons
+ 读取 user_lesson_progress
+ 展示 lesson 完成状态

### 完成标准
+ 用户可以看到课程列表
+ 用户可以进入课程详情
+ 用户可以选择 lesson
+ 用户可以进入 `/play/:lessonId`

---

## 第 3 周：Typing Battle 核心玩法
### 目标
完成游戏主流程。

### 开发内容
+ 创建游戏页
+ 创建敌人组件
+ 创建血条组件
+ 创建题目组件
+ 创建输入框组件
+ 创建游戏状态管理
+ 创建 `useTypingBattle`
+ 支持 vocabulary unit
+ 支持 translation unit
+ 实现正确 / 错误判断
+ 实现分数计算
+ 实现结算弹窗

### 完成标准
+ 用户可以完整玩完一个 lesson
+ 游戏结束后可以看到结算结果
+ PC 和手机都能基本使用

---

## 第 4 周：结算提交与统计展示
### 目标
打通前端游戏和后端统计。

### 开发内容
+ 游戏结束后调用 `submit_lesson_result`
+ 提交 score
+ 提交 correct_count
+ 提交 wrong_count
+ 提交 enemy_kill_count
+ 提交 word_input_count
+ 提交 study_seconds
+ 刷新 profile
+ 创建统计页
+ 创建 `useStats`
+ 展示累计学习数据
+ 展示最近学习记录

### 完成标准
+ 游戏结果可以保存到后端
+ 用户经验、金币、统计数据会更新
+ 刷新页面后数据仍然存在

---

## 第 5 周：成就与轻社交
### 目标
完成 MVP 的留存辅助系统。

### 开发内容
+ 创建成就页
+ 创建成就卡片
+ 创建 `useAchievements`
+ 展示已解锁 / 未解锁成就
+ 游戏结算后展示新成就提示
+ 创建动态页
+ 创建动态卡片
+ 创建 `useFeed`
+ 展示学习动态
+ 实现点赞
+ 实现取消点赞

### 完成标准
+ 用户可以查看成就
+ 用户完成学习后能看到对应动态
+ 用户可以点赞 / 取消点赞

---

## 第 6 周：UI 优化与上线
### 目标
完成上线体验。

### 开发内容
+ 首页优化
+ Typing Battle UI 优化
+ 移动端适配
+ Loading 状态
+ Error 状态
+ Empty 状态
+ Toast 提示
+ AI Practice Coming Soon 页面
+ Vercel 部署
+ 域名绑定
+ 基础 SEO
+ 测试完整流程

### 完成标准
+ 用户可以完整走完注册、选课、游戏、结算、统计、成就、动态流程
+ 手机和电脑体验基本可用
+ 项目可以上线给第一批用户测试

---

# 十一、前端 MVP 不做内容
第一版不做：

+ AI 对话
+ AI 老师
+ AI 生成课程
+ 用户上传课程编辑器
+ 课程市场
+ 装备系统
+ 职业系统
+ 多人 PK
+ 公会
+ 私信
+ 商城
+ 会员付费
+ 复杂剧情系统
+ 复杂战斗动画

---

# 十二、前端最终验收标准
1. 用户可以注册登录
2. 登录后可以看到个人基础信息
3. 用户可以浏览课程
4. 用户可以进入 lesson
5. 用户可以进入 Typing Battle
6. 用户可以通过输入答案攻击敌人
7. 用户可以完成一局游戏
8. 游戏结束后可以看到结算
9. 游戏结果可以提交到后端
10. 用户可以看到学习统计
11. 用户可以看到成就
12. 用户可以看到学习动态
13. 用户可以点赞动态
14. AI Practice 页面显示 Coming Soon
15. 手机和电脑都可以正常使用

---

# 十三、最重要的前端原则
第一版前端只围绕一个体验：

> 用户打开后，可以轻松玩 10 分钟。
>

所以 Typing Battle 页面是最高优先级。

前端 UI 可以简单，但游戏流程必须顺。

