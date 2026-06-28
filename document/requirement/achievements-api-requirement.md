# 成就系统 — 接口需求

## 概述

成就系统包含 16 个成就，分为两类触发时机：
- **统一在 `POST /api/lessons/{id}/submit` 中触发**（16 个全部一起检查）

---

## 数据库设计

两张表：

- **`achievements`** — 成就清单，预置 16 条固定数据（id、title、description、category、icon、target、reward_coins）
- **`user_achievements`** — 用户已解锁成就记录（user_id、achievement_id、unlocked_at）

---

## 接口 1：获取成就列表

```
GET /api/achievements
```

**需要登录** ✅

### 成功响应

```json
{
  "code": 0,
  "message": "success",
  "data": [
    {
      "id": 1,
      "title": "First Steps",
      "description": "Complete your first lesson.",
      "category": "Learning",
      "icon": "stadia_controller",
      "unlocked": true,
      "current": 1,
      "target": 1,
      "reward_description": "20 Coins"
    },
    {
      "id": 2,
      "title": "Dedicated Learner",
      "description": "Complete 10 lessons.",
      "category": "Learning",
      "icon": "school",
      "unlocked": false,
      "current": 8,
      "target": 10,
      "reward_description": "50 Coins"
    }
  ]
}
```

### 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | number | 成就 ID |
| `title` | string | 成就名称 |
| `description` | string | 描述 |
| `category` | string | 分类：`Learning` / `Streak` / `Accuracy` / `XP` / `Words` / `Speed` / `Check-in` |
| `icon` | string | Material Symbols 图标名 |
| `unlocked` | boolean | 是否已解锁 |
| `current` | number | 当前进度 |
| `target` | number | 目标值 |
| `reward_description` | string | 奖励描述 |

---

## 接口 2：提交 lesson 时返回新成就

```
POST /api/lessons/{id}/submit
```

### 新增返回字段

```json
{
  "code": 0,
  "data": {
    "xp_earned": 50,
    "coins_earned": 10,
    "total_xp": 1520,
    "lesson_status": "completed",
    "next_lesson_status": "available",
    "new_achievements": [
      {
        "id": 1,
        "title": "First Steps",
        "description": "Complete your first lesson.",
        "reward_description": "20 Coins"
      }
    ]
  }
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| `new_achievements` | array | 本次新解锁的成就列表，没有则为 `[]` |

---

## 成就检查规则

所有成就的检查统一在 `POST /api/lessons/{id}/submit` 中完成（因为 submit 已自动创建 check-in 记录，无需分开检查）。每次提交后检查全部 16 个条件，只返回本次新解锁的成就。

| ID | 成就 | 条件 | 数据来源 |
|:--:|:-----|:-----|:---------|
| 1 | First Steps | `total_lessons ≥ 1` | lesson_records 计数 |
| 2 | Dedicated Learner | `total_lessons ≥ 10` | lesson_records 计数 |
| 3 | Scholar | `total_lessons ≥ 25` | lesson_records 计数 |
| 4 | Course Complete | 该课程 `current_lesson = total_lessons` | courses 表 |
| 5 | Comeback Kid | 已有记录 `accuracy < 50` 且本次 `accuracy ≥ 80` | lesson_records upsert 前后对比 |
| 6 | Perfect Score | 本次 `accuracy = 100` | lesson_records |
| 7 | Sharp Mind | 累计 `accuracy ≥ 80` 的次数 `≥ 10` | lesson_records |
| 8 | XP Starter | `total_xp ≥ 500` | users 表 |
| 9 | XP Hunter | `total_xp ≥ 2000` | users 表 |
| 10 | Word Novice | 累计 `total_questions ≥ 100` | lesson_records |
| 11 | Word Master | 累计 `total_questions ≥ 1000` | lesson_records |
| 12 | Quick Learner | 本次 `time_seconds ≤ 30` | lesson_records |
| 13 | On Fire | `streak_days ≥ 7` | checkins 连续天数 |
| 14 | Unstoppable | `streak_days ≥ 30` | checkins 连续天数 |
| 15 | First Check-in | 累计打卡 `≥ 1` | checkins 表 |
| 16 | Dedicated Checker | 累计打卡 `≥ 30` | checkins 表 |

### 说明

- 每次检查时，只返回**本次新解锁**的成就（之前已解锁的不再返回）
- `current` 和 `target` 用于前端显示进度条
- 成就解锁时，后端自动将对应金币加到用户的 `coins` 余额中
