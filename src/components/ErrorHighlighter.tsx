
import React, { useEffect, useState } from "react";
import { Alert } from "antd";
import style from "./index.module.css";
import axios from "axios";

interface ErrorHighlighterProps {
  filePath: string; // 文件路径
  errorLine: number; // 错误行号
  errorColumn: number; // 错误列号
}

const ErrorHighlighter: React.FC<ErrorHighlighterProps> = ({
  filePath,
  errorLine,
  errorColumn,
}) => {
  const [highlightedCode, setHighlightedCode] = useState<string | null>(null); // 高亮后的代码

  const fetchFileContent = async (path: string) => {
    const res = await axios.get(path)
    return res as unknown as string
  };

  useEffect(() => {
    // 加载文件内容
    const loadFileContent = async () => {
      const content = await fetchFileContent(filePath);
      // 高亮错误
      const lines = content.split("\n");

      const lineIndex = errorLine - 1;

      if (lineIndex < 0 || lineIndex >= lines.length) {
        setHighlightedCode("行号超出范围，无法高亮！");
        return;
      }
      const code = lines.map((line, idx) => {
        if (idx === lineIndex) {
          // 高亮错误行
          return `<div class="${style.highlightedLine}"><span class="${style.lineNumber}">${idx + 1}</span>: <span class="${style.errorHighlight}">${line}</span></div>`;
        }
        // 普通行
        return `<div><span class="${style.lineNumber}">${idx + 1}</span>: ${line}</div>`;
      });

      const start = lineIndex - 5 > 0 ? lineIndex - 5 : 0
      const end = lineIndex + 5 < lines.length ? lineIndex + 5 : lines.length
      const codeList = code.slice(start, end)

      let highlighted = codeList.join("\n");

      setHighlightedCode(highlighted);
    };

    loadFileContent();
  }, [filePath, errorLine, errorColumn]);

  return (
    <div style={{ padding: "20px" }}>
      <Alert
        message={filePath}
        type="error"
        showIcon
        style={{ marginBottom: "20px" }}
      />
      <div
        className={style.codeDisplay}
        dangerouslySetInnerHTML={{
          __html: highlightedCode || "加载文件内容中...",
        }}
      />
    </div>
  );
};

export default ErrorHighlighter;
