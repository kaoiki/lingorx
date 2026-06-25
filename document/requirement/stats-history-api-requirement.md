# Statistics 页面 — 接口需求

## 概述

Statistics 页面（`/stats`）展示用户学习统计数据、7 天趋势图和最近学习记录。

**此接口独立于首页 `GET /api/stats`**，专供 Statistics 页面使用。

---

## 获取统计数据

```
GET /api/stats/history
```

### 权限

- 需要登录：`Authorization: Bearer <token>`
- Header：`X-App-Code: lingorx`

### 成功响应

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "total_xp": 320,
    "total_coins": 54,
    "total_time_seconds": 386,
    "streak_days": 2,
    "daily_activity": [
      { "date": "06/19", "xp": 0, "coins": 0, "missions": 0 },
      { "date": "06/20", "xp": 0, "coins": 0, "missions": 0 },
      { "date": "06/21", "xp": 0, "coins": 0, "missions": 0 },
      { "date": "06/22", "xp": 0, "coins": 0, "missions": 0 },
      { "date": "06/23", "xp": 0, "coins": 0, "missions": 0 },
      { "date": "06/24", "xp": 100, "coins": 16, "missions": 2 },
      { "date": "06/25", "xp": 220, "coins": 38, "missions": 4 }
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

### 字段说明

| 字段 | 类型 | 说明 |
|---|---|---|
| `total_xp` | number | 累计经验值（与首页一致） |
| `total_coins` | number | 累计金币数 |
| `total_time_seconds` | number | 累计学习时长（秒） |
| `streak_days` | number | 连续学习天数 |
| `daily_activity` | array | 近 7 天每日活动数据（按 date 升序），用于折线图 |
| `date` | string | 日期，格式 `MM/DD` |
| `xp` | number | 当日获得 XP |
| `coins` | number | 当日获得 Coins |
| `missions` | number | 当日完成任务数 |
| `recent_lessons` | array | 最近学习记录（按 completed_at 降序），建议最近 10-20 条 |
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

| 数据 | 来源 |
|------|------|
| `total_xp`、`total_coins` | users 表 |
| `total_time_seconds` | lesson_records 表 time_seconds 求和 |
| `streak_days` | lesson_records 表按 completed_at 计算连续天数 |
| `daily_activity` | lesson_records 表按日期聚合 |
| `missions` | 当日 today_missions 中 done=true 的数量 |
| `recent_lessons` | lesson_records 表 JOIN lessons 表 + courses 表 |

### 前端使用

| 区域 | 使用的字段 |
|------|-----------|
| 顶部 4 个统计卡片 | `total_xp`、`total_coins`、`total_time_seconds`、`streak_days` |
| 7 日趋势折线图 | `daily_activity`（三条线：XP、Coins、Missions） |
| 最近课程列表 | `recent_lessons`（标题、准确率、XP、耗时） |
