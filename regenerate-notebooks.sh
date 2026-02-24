#!/bin/bash
# Regenerate Notebook HTML — Run this if you update any .ipynb files

set -e

echo "🔄 Regenerating Notebook HTML..."
echo ""

# Run the conversion script
node scripts/convert-notebooks.js

echo ""
echo "✅ Notebooks regenerated!"
echo "📂 Output: /public/notebook-html/"
echo ""
echo "Next steps:"
echo "1. Restart dev server: npm run dev"
echo "2. Hard refresh browser: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)"
echo "3. Visit: http://localhost:3003"
