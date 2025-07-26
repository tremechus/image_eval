# GitHub Pages Deployment Guide

## Setup Steps

### 1. Create GitHub Repository
1. Create a new repository on GitHub (or use existing)
2. Push all files from this directory to the repository

### 2. Configure GitHub Pages
1. Go to repository **Settings > Pages**
2. Set **Source** to "GitHub Actions"
3. Set **Custom domain** to: `image_eval.tremech.us`
4. Enable **Enforce HTTPS**

### 3. DNS Configuration
Add a CNAME record in your DNS settings:
```
image_eval.tremech.us → your-username.github.io
```

### 4. Update Server CORS
1. Replace your current Caddyfile with `Caddyfile-fixed`
2. Restart Caddy to apply the new configuration
3. The new config allows requests from `https://image_eval.tremech.us`

### 5. Test Deployment
1. Wait for GitHub Actions to complete (check Actions tab)
2. Visit `https://image_eval.tremech.us`
3. Test image evaluation functionality

## Files for GitHub Pages

### Required Files:
- ✅ `index.html` - Main application
- ✅ `CNAME` - Custom domain configuration
- ✅ `README.md` - Project documentation
- ✅ `.github/workflows/deploy.yml` - Auto-deployment

### Server Files (for reference):
- 📄 `Caddyfile-fixed` - Updated CORS configuration
- 📄 `package.json` - Development server (not needed for production)

## Advantages of GitHub Pages

1. **Proper HTTPS Domain**: Eliminates local network security issues
2. **Reliable CORS**: No browser security blocks
3. **CDN Distribution**: Fast global access
4. **Auto-deployment**: Updates automatically on git push
5. **Free Hosting**: No server costs for frontend

## Expected Result

After deployment, the image evaluation app will be accessible at:
**https://image_eval.tremech.us**

The app should work perfectly with your Ollama server since:
- ✅ Proper HTTPS origin
- ✅ No local network restrictions  
- ✅ Professional domain setup
- ✅ Correct CORS configuration

## Troubleshooting

If issues persist after deployment:
1. Check GitHub Actions logs for deployment errors
2. Verify DNS propagation (may take up to 24 hours)
3. Confirm Caddy server is using the updated configuration
4. Test CORS headers with browser dev tools
