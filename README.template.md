# github-actions-cache-cleaner

${DESCRIPTION}

## 使い方

```yaml
on:
  push:
    branches:
      - main
  schedule:
    - cron: "0 21 * * *"
  workflow_dispatch:

jobs:
  github-actions-cache-cleaner:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3.1.0
      - uses: dev-hato/github-actions-cache-cleaner@v0
        with:
          github-token: ${{secrets.GITHUB_TOKEN}}
```

## 引数

${INPUTS}

## 開発

### 設定

<https://pre-commit.com/> の手順に従って `pre-commit` をインストールします。  
これにより、コミット時にクレデンシャルが含まれていないかの検査が行われるようになります。
