# Lingorx — 课程列表接口说明

> Base URL: `https://www.heartbeat.cool:2248`
> 需要登录：`Authorization: Bearer <token>`
> Header: `X-App-Code: lingorx`

---

## 获取课程列表

```
GET /api/courses
```

返回所有可学习的课程，包含用户学习进度。

**成功响应**

```json
{
  "code": 0,
  "message": "success",
  "data": [
    {
      "id": "a0000001-0000-0000-0000-000000000001",
      "title": "English Beginner",
      "description": "Learn daily words, simple sentences, and basic expressions for everyday use.",
      "language": "en",
      "level": "Beginner",
      "status": "learning",
      "total_lessons": 6,
      "current_lesson": 4,
      "icon": "menu_book"
    },
    {
      "id": "a0000001-0000-0000-0000-000000000002",
      "title": "Japanese N5",
      "description": "Master hiragana, katakana, and basic kanji for the JLPT N5 level.",
      "language": "ja",
      "level": "N5",
      "status": "not_started",
      "total_lessons": 4,
      "current_lesson": 0,
      "icon": "translate"
    }
  ]
}
```

### 字段说明

| 字段 | 类型 | 说明 |
|---|---|---|
| id | string | 课程 UUID |
| title | string | 课程名称 |
| description | string | 简短描述 |
| language | string | 语言代码，如 `en`、`ja` |
| level | string | 难度等级，如 `Beginner`、`N5` |
| status | string | `learning` / `not_started` / `completed` |
| total_lessons | number | 该课程包含的 lesson 总数 |
| current_lesson | number | 当前学到第几课（未开始为 0） |
| icon | string | 图标标识，如 `menu_book`、`translate` |

### status 说明

| 值 | 含义 | 前端展示 |
|---|---|---|
| `learning` | 有进度，未完成 | "Learning" 板块，按钮 "Continue" |
| `not_started` | 尚未开始 | "All Courses" 板块，按钮 "Start Course" |
| `completed` | 已完成所有 lesson | "All Courses" 板块，按钮 "Review" |

### 前端处理

- 语言筛选标签：从返回数据中提取 `language` 字段去重
- Learning 计数：`data.filter(c => c.status === 'learning').length`
- All Courses 计数：`data.length`

> 无需分页，一次返回全部课程。
