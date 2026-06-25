# Statistics 页面 — API 需求

## 概述

Statistics 页面展示用户学习统计数据、今日任务完成情况、以及最近学习记录。

---

## 获取统计数据

```
GET /api/stats
```

**需要登录** ✅ — `Authorization: Bearer <token>`
**Header**: `X-App-Code: lingorx`

### 请求

无参数。

### 成功响应

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "total_xp": 320,
    "total_coins": 54,
    "total_lessons": 4,
    "total_defeated": 4,
    "total_words_typed": 40,
    "total_time_seconds": 386,
    "today_time_seconds": 341,
    "today_words": 30,
    "today_missions": [
      { "id": 1, "label": "Complete one battle", "done": true, "progress": "" },
      { "id": 2, "label": "Practice 10 minutes", "done": false, "progress": "5/10 min" },
      { "id": 3, "label": "Learn 20 words", "done": true, "progress": "20/20" },
      { "id": 4, "label": "Earn 50 XP", "done": true, "progress": "50/50" },
      { "id": 5, "label": "80%+ accuracy", "done": false, "progress": "63%" },
      { "id": 6, "label": "Login streak +1", "done": true, "progress": "" }
    ],
    "achievements": {
      "unlocked": 0,
      "total": 0
    },
    "streak_days": 2,
    "daily_activity": [
      { "date": "06/19", "xp": 0, "coins": 0, "lessons": 0 },
      { "date": "06/20", "xp": 0, "coins": 0, "lessons": 0 },
      { "date": "06/21", "xp": 0, "coins": 0, "lessons": 0 },
      { "date": "06/22", "xp": 0, "coins": 0, "lessons": 0 },
      { "date": "06/23", "xp": 0, "coins": 0, "lessons": 0 },
      { "date": "06/24", "xp": 100, "coins": 16, "lessons": 1 },
      { "date": "06/25", "xp": 220, "coins": 38, "lessons": 2 }
    ],
    "recent_lessons": [
      {
        "lesson_id": "b0000001-0000-0000-0000-000000000003",
        "title": "Food & Drinks",
        "course_name": "English Beginner",
        "correct_count": 10,
        "wrong_count": 0,
        "accuracy": 100,
        "xp_earned": 120,
        "time_seconds": 120,
        "completed_at": "2026-06-25T01:04:37Z"
      }
    ]
  }
}
```

### 新增字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `daily_activity` | array | 近 7 天每日 XP 和 Coins 获取量（按日期降序），用于折线图 |
| `date` | string | 日期，格式 `MM/DD` |
| `xp` | number | 当日获得 XP |
| `coins` | number | 当日获得 Coins |
| `lessons` | number | 当日完成 lesson 数 |

| 字段 | 类型 | 说明 |
|------|------|------|
| `recent_lessons` | array | 最近学习记录（按 completed_at 降序），建议返回最近 10-20 条 |
| `lesson_id` | string | lesson UUID |
| `title` | string | lesson 名称 |
| `course_name` | string | 所属课程名称 |
| `correct_count` | number | 答对数 |
| `wrong_count` | number | 答错数 |
| `accuracy` | number | 准确率百分比（0-100） |
| `xp_earned` | number | 本局获得 XP |
| `time_seconds` | number | 本局耗时（秒） |
| `completed_at` | string | ISO 8601 完成时间 |

### 数据来源

| 字段 | 来源 |
|------|------|
| `recent_lessons` | lesson_records 表 JOIN lessons 表 + courses 表 |
| `course_name` | 通过 lesson_id → course_id → course title |

### 前端使用

| 展示区 | 使用的字段 |
|--------|-----------|
| 顶部统计卡片 | `total_xp`、`total_coins`、`total_time_seconds`、`streak_days` |
| 今日任务环形图 | `today_missions` |
| 最近活动柱状图 | `recent_lessons`（XP 按 lesson 排序） |
| 最近课程列表 | `recent_lessons`（显示标题、准确率、XP、耗时、时间） |
