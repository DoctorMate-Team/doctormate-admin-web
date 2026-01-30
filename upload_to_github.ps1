# Script to upload project to GitHub
Write-Host "🚀 Starting Git Setup..." -ForegroundColor Cyan

# Check if .git folder exists
if (Test-Path .git) {
    Write-Host "⚠️ Git is already initialized." -ForegroundColor Yellow
} else {
    Write-Host "📦 Initializing Git..."
    git init
}

# Add all files
Write-Host "📝 Adding files..."
git add .

# Initial commit
Write-Host "💾 Committing files..."
git commit -m "Initial commit: DoctorMate Admin Web"

# Set branch to main
Write-Host "🌿 Setting branch to main..."
git branch -M main

# Add remote origin
Write-Host "🔗 Adding remote origin..."
if (git remote) {
    git remote remove origin
}
git remote add origin https://github.com/DoctorMate-Team/doctormate-admin-web.git

# Push to GitHub
Write-Host "☁️ Pushing to GitHub (this may open a browser for login)..." -ForegroundColor Green
git push -u origin main

Write-Host "✅ Done!" -ForegroundColor Green
