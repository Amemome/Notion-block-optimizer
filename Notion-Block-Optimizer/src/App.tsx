import { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import EnterApiandPage from "./components/EnterApiPage";

export default function CustomMarkdownEditor() {
  const [value, setValue] = useState("## 여기에 Markdown을 입력하세요 ✍️");
  
  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold">📝 Custom Markdown Editor</h2>
      <EnterApiandPage />
      <SimpleMDE value={value} onChange={setValue} />
      <button
        className="mt-4 p-2 bg-blue-500 text-white rounded"
        onClick={() => navigator.clipboard.writeText(value)}
      >
        📋 클립보드에 복사
      </button>
    </div>
  );
}
