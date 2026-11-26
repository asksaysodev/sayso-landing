#!/usr/bin/env bash
set -euo pipefail

working="${RUNNER_TEMP:?}/docs-sync-offline"
case "${1:?}" in
  install)
    mkdir -p -m 700 "$working/bin"
    curl --fail --silent --show-error --location --retry 2 --max-time 240 -o "$working/runtime.tgz" https://github.com/ggml-org/llama.cpp/releases/download/b12110/llama-b12110-bin-ubuntu-x64.tar.gz
    echo "368227edcc229be5f9bed16a2223d79b5e41d0ac2e19bcf5825e82291c060e55  $working/runtime.tgz" | sha256sum -c -
    tar -xzf "$working/runtime.tgz" -C "$working/bin"
    curl --fail --silent --show-error --location --retry 2 --max-time 400 -o "$working/model.gguf" https://huggingface.co/Qwen/Qwen3-4B-GGUF/resolve/bc640142c66e1fdd12af0bd68f40445458f3869b/Qwen3-4B-Q4_K_M.gguf
    echo "7485fe6f11af29433bc51cab58009521f205840f5b4ae3a32fa7f92e8534fdf5  $working/model.gguf" | sha256sum -c -
    ;;
  run)
    executable="$(find "$working/bin" -name llama-server -type f -print -quit)"
    test -n "$executable"
    sudo unshare --net -- /bin/bash -euc '
      ip link set lo up
      test "$(ip -o link show | wc -l)" -eq 1
      exec runuser -u "$1" -- env -i PATH=/usr/bin:/bin HOME="$2" /bin/bash -euc "
        umask 077
        export LD_LIBRARY_PATH=\"\$(dirname \"\$1\")\"
        \"\$1\" --model \"\$2/model.gguf\" --offline --host 127.0.0.1 --port 38491 --ctx-size 16384 --parallel 1 --threads 4 --reasoning off --no-webui >\"\$2/reviewer.log\" 2>&1 &
        trap \"kill \$!\" EXIT
        GITHUB_STEP_SUMMARY=\"\$4\" \"\$3\" scripts/docs-sync/private-review.mjs \"\$5\"
      " _ "$3" "$2" "$4" "$5" "$6"
    ' _ "$USER" "$working" "$executable" "$(command -v node)" "$GITHUB_STEP_SUMMARY" "${2:?}"
    ;;
  *) exit 2 ;;
esac
