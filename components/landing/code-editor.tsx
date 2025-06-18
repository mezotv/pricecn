import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prism-themes/themes/prism-vsc-dark-plus.css";
import { CornerRightDown } from "lucide-react";

const hightlightWithLineNumbers = (input: string, language: string) =>
  highlight(input, language)
    .split("\n")
    .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
    .join("\n");

export const CodeEditor = ({
  customConfig,
  handleConfigChange,
  error,
}: {
  customConfig: string;
  handleConfigChange: (value: string) => void;
  error: boolean;
}) => {
  return (
    <div className="flex flex-col w-full relative rounded-md">
      {error ? (
        <div className="bg-red-600 translate-y-2 pb-2 rounded-t-lg text-white h-10 items-center justify-center flex top-0 right-0 w-full z-100 text-sm">
          Invalid JSON
        </div>
      ) : (
        <div className="h-10 translate-y-2 flex items-center pb-3 text-sm bg-transparent text-muted-foreground z-0">
          Try me
          <span className="hidden sm:inline">&nbsp;with your own products</span>
          !
          <CornerRightDown className="translate-y-1 ml-1" size={14} />
        </div>
      )}
      <div className="overflow-scroll z-10 max-h-[450px] rounded-md border bg-zinc-900 shadow-lg shadow-black/60 border-zinc-700 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#18181b] [&::-webkit-scrollbar-track]:rounded-md [&::-webkit-scrollbar-thumb]:bg-white [&::-webkit-scrollbar-thumb]:rounded-md overflow-x-hidden">
        <style>
          {`
        .editorLineNumber {
        position: absolute;
        left: 0px;
        color: #666;
        text-align: right;
        width: 25px;
        font-weight: 100;
        }
      
      `}
        </style>
        <Editor
          value={customConfig}
          onValueChange={handleConfigChange}
          highlight={(code) => hightlightWithLineNumbers(code, languages.js)}
          padding={10}
          textareaClassName="focus:outline-hidden pl-12!"
          preClassName="pl-12!"
          style={{
            fontFamily: "monospace",
            fontSize: 11,
            caretColor: "white",
            color: "white",
          }}
        />
      </div>
    </div>
  );
};
