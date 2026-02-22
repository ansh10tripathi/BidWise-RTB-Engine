@echo off
echo Stopping Next.js dev server...
taskkill /F /IM node.exe 2>nul

echo Cleaning Next.js cache...
rmdir /s /q .next 2>nul
rmdir /s /q node_modules\.cache 2>nul

echo Starting fresh dev server...
npm run dev
