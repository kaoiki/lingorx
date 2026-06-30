# LingoRx — 平台使用说明书

> 版本：v0.0.19 | 2026-06-28

---

## 一、关于 LingoRx

LingoRx 是一个以 **Typing Battle（打字对战）** 为核心的类游戏化语言学习 Web 应用。用户通过学习课程、完成战斗来获得 XP 和金币，解锁成就，并与社区互动。

LingoRx 是 **HeartBeat** 旗下的产品。

---

## 二、功能清单

### 1. 用户系统
- 注册 / 登录 / 找回密码
- 个人设置（修改昵称、修改密码、注销账号）

### 2. 课程系统
- 6 门课程，共 30 个 lesson
  - English Beginner（6 课）
  - English Grammar Basics（4 课）
  - English Verb Conjugation（4 课）
  - Japanese N5（4 课）
  - Spanish Vocabulary（4 课）
  - Chinese Vocabulary（4 课）
- 课程详情页显示 lesson 列表 + 已完成印章（Great/Review/Retry）

### 3. Typing Battle 核心玩法
- 描述式 prompt → 打字输入答案
- 💡 灯泡提示（默认关闭，可手动开启显示选项）
- ⏱ 每题 30 秒倒计时，超时自动算错
- ❤️ 怪物 HP，答对扣血，HP 归零提前结束
- 🎊 完成时 confetti 烟花
- 结算弹窗显示 XP、Coin、准确率、耗时

### 4. 结算与统计
- 每次完成自动提交结果到后端
- 首次学习 → 奖励 XP/Coin
- Review（≥50%）→ 不提交，纯复习
- Retry（<50%）→ 提交更新记录
- 首页 Dashboard 展示统计数据（XP、Lessons、用时、准确率）
- Statistics 页面（7 日趋势图 + Level 进度条 + 最近课程记录）

### 5. 成就系统
- 16 个成就，涵盖学习、连续天数、准确率、XP、词数、速度、打卡
- 解锁时弹出成就弹窗 + 烟花
- 金币奖励自动发放

### 6. 打卡与社交
- 每次完成 lesson 自动生成打卡记录
- Check-ins 页面：动态流 + All/Mine 切换 + 无限滚动
- 🔥 加油功能（不能给自己加油，乐观更新）
- 排行榜：今日 Top 3 + 总榜

### 7. Feed 个人履历
- 30 天热力图（颜色深浅反映活动量）
- 点击色块查看当日活动明细（lesson / checkin / achievement）

### 8. 其他
- 🍪 Cookie Consent 横幅
- 💬 每日鼓励弹窗（每天随机一条，1 天 1 次）
- 🌙 暗色模式适配
- 📱 移动端自适应
- 📄 Privacy Policy / Terms of Service

---

## 三、测试账号

当前为开发环境，注册即可使用。

测试流程建议：
1. 注册账号 → 登录
2. 浏览课程列表 → 进入 English Beginner
3. 开始 Greetings → 答题 → 完成游戏 → 看结算
4. 刷新首页 → 看统计数据变化
5. 去 Check-ins → 看打卡记录
6. 去 Achievements → 看成就不停
7. 去 Feed → 点击色块看活动明细
8. 去 Statistics → 看看 7 日趋势

---

## 四、架构说明

| 层级 | 技术 |
|:----|:------|
| 前端框架 | Vue 3 + TypeScript |
| UI 组件 | Nuxt UI 4 + Tailwind CSS 4 |
| 图表 | ECharts |
| 路由 | Vue Router |
| 构建 | Vite |
| 后端 API | FastAPI（独立项目） |
| 数据库 | PostgreSQL（通过 Supabase） |

课程配置文件：`public/lessons/{uuid}.json`
鼓励语文件：`public/encouragements.json`

---

## 五、当前版本限制

- ❌ AI Practice（Playground）— 尚未发布
- ❌ Community 社区 — 尚未发布
- ❌ Groups 学习小组 — 尚未发布
- ❌ Rankings 排行榜 — 尚未发布
- ❌ 能力评测（Assessment）— 页面壳，待实现
- ⚠️ 数据仅为测试数据，非生产环境

---

## 六、反馈

如有问题或建议，请通过应用内的 Feedback 功能提交，或直接联系开发者。
