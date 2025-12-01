#!/usr/bin/env bash
set -e

# EDIT THESE
OWNER="<GITHUB_USERNAME_OR_ORG>"
REPO="<REPO_NAME>"
TOKEN="${GITHUB_TOKEN}"

if [ -z "$TOKEN" ]; then
  echo "Please set GITHUB_TOKEN environment variable (with repo scope)."
  exit 1
fi

API_BASE="https://api.github.com/repos/$OWNER/$REPO/contents"

create_file() {
  PATH_ON_REPO="$1"
  TEMPPATH="$2"
  BASE64_CONTENT=$(base64 -w 0 "$TEMPPATH")
  JSON_PAYLOAD=$(jq -n --arg msg "create $PATH_ON_REPO" --arg content "$BASE64_CONTENT" '{message: $msg, content: $content}')
  echo "Creating $PATH_ON_REPO..."
  curl -s -H "Authorization: token $TOKEN" -X PUT "$API_BASE/$PATH_ON_REPO" -d "$JSON_PAYLOAD" | jq -r '.content.path, .content.sha' >/dev/null
}

# Example: create README
cat > /tmp/README.md <<'README'
# TaskManager

Minimal Task Management app (React + Spring Boot).

See repository for code and run instructions.
README
create_file "README.md" "/tmp/README.md"

# The script continues similarly to create each file...
# (For brevity, include file creation steps as in the original canvas doc.)
echo "Script prepared. Add the rest of file blocks as needed or use the provided canvas doc."
