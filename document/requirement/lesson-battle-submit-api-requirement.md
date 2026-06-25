# Lesson Battle 提交结算 — API 需求

## 概述

用户完成一场 Typing Battle 后，前端将游戏结果提交给后台。后台记录完成情况、结算 XP/Coin、更新 lesson 状态，并返回结果供前端展示。

---

## 接口

```
POST /api/lessons/{lesson_id}/submit
```

### 权限

- 需要登录：`Authorization: Bearer <token>`
- Header：`X-App-Code: lingorx`

### 请求体

```json
{
  "correct_count": 8,
  "wrong_count": 2,
  "total_questions": 10,
  "total_time_seconds": 45
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `correct_count` | number | ✅ | 答对题数 |
| `wrong_count` | number | ✅ | 答错题数 |
| `total_questions` | number | ✅ | 总题数 |
| `total_time_seconds` | number | ✅ | 游戏耗时（秒） |

> 不传 `accuracy`，后台根据 `correct_count / (correct_count + wrong_count)` 自行计算。

### 成功响应

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "xp_earned": 50,
    "coins_earned": 10,
    "total_xp": 1520,
    "lesson_status": "completed",
    "next_lesson_status": "available"
  }
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| `xp_earned` | number | 本局获得的经验值 |
| `coins_earned` | number | 本局获得的金币 |
| `total_xp` | number | 用户累计总经验值（方便前端直接更新显示） |
| `lesson_status` | string | `completed` |
| `next_lesson_status` | string | 下一课的状态：`available` / `locked`（最后一课则无下一课） |

### 失败响应

```json
{
  "code": 401,
  "message": "token invalid"
}
```

```json
{
  "code": 1,
  "message": "lesson not found or not owned by user"
}
```

---

## 后台逻辑

### 1. XP / Coin 计算公式（建议）

```
accuracy      = correct_count / (correct_count + wrong_count)
accuracy_bonus = accuracy ≥ 0.8 ? 20 : (accuracy ≥ 0.5 ? 10 : 0)

xp_earned     = correct_count × 10 + accuracy_bonus
coins_earned  = correct_count × 2
```

> 公式只是建议，后台可自行调整平衡性。

### 2. 写入数据

| 写哪里 | 写什么 |
|--------|--------|
| 用户表 `users` | `total_xp += xp_earned`，`coins += coins_earned` |
| 学习记录表 `lesson_records` | `{ user_id, lesson_id, correct_count, wrong_count, total_questions, time_seconds, xp_earned, completed_at }` |
| lesson 状态 | 当前 lesson → `completed`，下一课 → `available` |

### 3. 幂等

- 同一个 lesson 重复提交应 **覆盖**（更新 `lesson_records`），不应重复加 XP/Coin
- 或者：已 `completed` 的 lesson 拒绝再次提交，返回错误

---

## 前端对接

| 步骤 | 说明 |
|------|------|
| 1 | `play.vue` `onMounted` 时记 `startTime = Date.now()` |
| 2 | `finishBattle()` 时计算 `total_time_seconds` |
| 3 | 调 `POST /api/lessons/{lesson_id}/submit` |
| 4 | 结算弹窗显示 `xp_earned`、`coins_earned` |
| 5 | "Back to Course" 返回课程详情页，API 自动返回新状态 |

---

## 依赖

- lesson 表需有 `id`（UUID），与 `public/lessons/{uuid}.json` 对应
- 用户表需有 `total_xp`、`coins` 字段
- 需要有 lesson 学习记录表（`lesson_records`）
