---
name: Git PR Description
description: 根據當前 branch 與目標 branch 的差異，自動產生 Pull Request 的 Title 與 Description。當使用者提到「PR」、「Pull Request」、「寫 PR」、「PR 描述」、「PR description」、「建立 PR」時觸發此 Skill。
---

# Git PR Description — 自動產生 PR 標題與描述

根據當前 branch 相對於目標 branch（預設 `main`）的所有 commit 與 diff，產出結構化的 PR Title 與 Description。

---

## 流程

### 1. 確認分支資訊

取得當前 branch 名稱與目標 branch：

```bash
git branch --show-current
```

預設目標 branch 為 `main`。若使用者指定其他 base branch，以使用者指定為準。

確認當前 branch 相對於目標 branch 有 commit 差異：

```bash
git log --oneline main..HEAD
```

若無差異，告知使用者「當前 branch 與目標 branch 沒有差異」後結束。

---

### 2. 蒐集變更資訊

取得完整的 commit 列表與 diff：

```bash
# commit 摘要
git log --oneline main..HEAD

# 詳細 commit 訊息
git log --format="%h %s%n%b" main..HEAD

# 變更檔案統計
git diff --stat main..HEAD

# 完整 diff（用於分析具體改動）
git diff main..HEAD
```

---

### 3. 分析變更內容

根據蒐集到的資訊，分析：

- **變更的目的**：這個 branch 要解決什麼問題或新增什麼功能
- **修改範圍**：涉及哪些元件、模組、設定檔
- **影響層面**：是否有破壞性變更、是否影響既有功能

---

### 4. 產生 PR Title

#### Title 格式

```
<type>: <簡短描述>
```

**type 對照表：**

| type | 使用時機 |
|------|----------|
| `feat` | 新增功能 |
| `fix` | 修復 bug |
| `refactor` | 重構 |
| `style` | 樣式調整 |
| `chore` | 雜務、設定 |
| `docs` | 文件更新 |
| `test` | 測試相關 |

**Title 規則：**

- 使用繁體中文描述
- 不超過 72 字
- 用動詞開頭：新增、調整、修正、移除、重構
- 精準描述此 PR 的核心目的

---

### 5. 產生 PR Description

使用 `references/pr-template.md` 中的模板產生 Description。

#### Description 結構

```markdown
## 為什麼要這樣做

簡述此 PR 的背景與動機

## 修改的內容

依模組 / 元件分組列出改動：

### [元件或模組名稱]
- 具體改了什麼、為什麼這樣改

### [另一個元件或模組名稱]
- 具體改了什麼

## 測試步驟

### 測試案例 1：[測試情境名稱]

1. 操作步驟一
2. 操作步驟二
3. 預期結果

### 測試案例 2：[測試情境名稱]

1. 操作步驟一
2. 操作步驟二
3. 預期結果
```

---

### 6. 輸出結果

使用 `notify_user` 將完整的 PR Title + Description 展示給使用者。

輸出格式：

```
📝 PR Title:
<title>

📄 PR Description:
<description 完整內容>
```

使用者可要求調整任何部分後再複製使用。

---

## 邊界情況處理

- **存在未提交的變更**：提醒使用者先提交或 stash，避免遺漏

## Additional Resources

### Reference Files

- **`references/pr-template.md`** — PR Description 的完整模板，可依團隊需求客製化
