export function detectLanguage(code: string): string {
  const patterns = [
    { lang: 'javascript', regex: /\b(console\.log|function|let|const|var|import|export|from|async|await)\b/ },
    { lang: 'typescript', regex: /\b(interface|type|namespace|enum|Array<|string|number|boolean)\b/ },
    { lang: 'python', regex: /\b(def|import|from|print\(|elif|if __name__ == "__main__":)\b/ },
    { lang: 'html', regex: /<(!DOCTYPE|html|head|body|div|span|p|a|img|script|style)[\s>]/i },
    { lang: 'css', regex: /([a-z-]+)\s*:\s*([^;]+);/i },
    { lang: 'cpp', regex: /\b(cout|cin|printf|scanf|#include|iostream|std::)\b/ },
    { lang: 'java', regex: /\b(public static void main|System\.out\.println|import java\.)\b/ },
    { lang: 'csharp', regex: /\b(using System|namespace|static void Main|Console\.WriteLine)\b/ },
    { lang: 'ruby', regex: /\b(def|end|puts|require|module)\b/ },
    { lang: 'php', regex: /<\?php|\$[a-zA-Z_]+/ },
    { lang: 'sql', regex: /\b(SELECT|INSERT|UPDATE|DELETE|FROM|WHERE|JOIN|GROUP BY|ORDER BY)\b/i },
    { lang: 'rust', regex: /\b(fn main|let mut|println!|match|use std::)\b/ },
    { lang: 'go', regex: /\b(package main|func main|import "fmt"|fmt\.Print)\b/ },
  ];

  for (const pattern of patterns) {
    if (pattern.regex.test(code)) {
      return pattern.lang;
    }
  }

  return '';
}
