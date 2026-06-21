# Courses 课程列表页面 — 接口需求

## 页面需求

展示所有可学习的课程（Course），支持按语言筛选，区分"学习中"和"全部课程"。

## 接口

### GET /api/courses

返回当前用户可见的所有课程列表。

**响应格式**

```json
{
  "code": 0,
  "message": "success",
  "data": [
    {
      "id": 1,
      "title": "English Beginner",
      "description": "Learn daily words, simple sentences, and basic expressions for everyday use.",
      "language": "English",
      "level": "Beginner",
      "status": "learning",
      "total_lessons": 20,
      "current_lesson": 4,
      "icon": "menu_book"
    }
  ]
}
```

### 字段说明

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| id | number | ✅ | 课程唯一 ID |
| title | string | ✅ | 课程名称，如 "English Beginner" |
| description | string | ✅ | 简短描述，1-2 句话 |
| language | string | ✅ | 语言名称，如 "English"、"Japanese" |
| level | string | ✅ | 难度等级，如 "Beginner"、"N5"、"A1" |
| status | string | ✅ | `learning` / `not_started` / `completed` |
| total_lessons | number | ✅ | 该课程包含的 lesson 总数 |
| current_lesson | number | ✅ | 用户当前学到第几课（未开始时为 0） |
| icon | string | ✅ | 图标标识，如 `menu_book`、`translate` |

### status 说明

| 值 | 含义 | 页面展示 |
|---|---|---|
| `learning` | 用户已开始学习，有进度 | 显示在 "Learning" 板块，按钮文字 "Continue" |
| `not_started` | 用户尚未开始 | 显示在 "All Courses" 板块，按钮文字 "Start Course" |
| `completed` | 用户已完成所有 lesson | 显示在 "All Courses" 板块，按钮文字 "Review" |

### 前端处理逻辑

以下逻辑由前端自行处理，后端无需额外接口：

1. **语言筛选标签**：从前端提取所有 `language` 字段去重生成
2. **Learning 板块计数**：`data.filter(c => c.status === 'learning').length`
3. **All Courses 板块计数**：`data.length`

### 备注

- 接口需要登录：`Authorization: Bearer <token>`，无 token 不返回数据（401）
- 前端未登录时不请求此接口，展示 "Sign in to browse courses" 提示
- Header 需带：`X-App-Code: lingorx`
- 无需分页，一次返回全部课程
- 课程结构为 **Course → Lesson 两级，无章节（Chapter）**
- 每个 Lesson 对应一场 Typing Battle
