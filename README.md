# 📊 Indian Stock Market Sector Analysis Dashboard

A comprehensive, interactive web dashboard for analyzing Indian stock market sectors with normalized metrics for easy comparison.

## 🌟 Features

- **5 Major Sectors**: NIFTY Auto, Bank, IT, FMCG, and Pharma
- **Interactive Charts**: Beautiful line charts with Chart.js
- **Normalized Comparison**: All metrics scaled 0-1 for perfect visual comparison
- **Real Values on Hover**: See actual PE, EPS, Revenue values when hovering over chart points
- **Multiple Metric Views**: View all metrics together or individually
- **Comprehensive Data**: 10 years of historical data (2015-2025)
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Data Export**: Download data as CSV files
- **Modern UI**: Beautiful gradient design with smooth animations

## 🚀 Live Demo

**GitHub Pages URL**: `https://YOUR-USERNAME.github.io/sector-dashboard/`

(Replace YOUR-USERNAME with your actual GitHub username after deployment)

## 📋 Data Sources

- **PE Ratios**: FinLive.in, NSE
- **Index Values**: Investing.com, NSE
- **Revenue & Earnings**: Calculated from PE ratios + Industry reports

## 🛠️ Technology Stack

- **Frontend**: Vanilla JavaScript (ES6+)
- **Charts**: Chart.js 4.4.0
- **Styling**: Pure CSS3 with CSS Grid and Flexbox
- **Deployment**: GitHub Pages (Static)

## 📦 Deployment Instructions

### Option 1: Deploy to GitHub Pages (Recommended)

1. **Create a GitHub Repository**
   ```bash
   # Go to github.com and create a new repository named "sector-dashboard"
   # Don't initialize with README (we already have one)
   ```

2. **Upload Files**
   - Download all files from this dashboard
   - Upload these files to your repository:
     - `index.html`
     - `styles.css`
     - `app.js`
     - `README.md`

3. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from branch
   - Branch: main (or master)
   - Folder: / (root)
   - Click Save

4. **Access Your Dashboard**
   - Wait 1-2 minutes for deployment
   - Visit: `https://YOUR-USERNAME.github.io/sector-dashboard/`

### Option 2: Deploy to Netlify

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag and drop the entire folder
3. Get instant live URL
4. (Optional) Configure custom domain

### Option 3: Local Testing

Simply open `index.html` in any modern browser:
```bash
# In the project directory
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

Or use a simple HTTP server:
```bash
# Python 3
python -m http.server 8000

# Node.js (if you have it)
npx http-server

# Then visit: http://localhost:8000
```

## 📊 Usage Guide

### Selecting Sector
Use the dropdown menu to choose from:
- NIFTY AUTO
- NIFTY BANK
- NIFTY IT
- NIFTY FMCG
- NIFTY PHARMA

### Viewing Metrics
Choose what to display:
- **All Metrics**: See Index, PE, EPS, Revenue together
- **Individual Metrics**: Focus on one metric
- **Comparisons**: View PE vs EPS, PE vs Revenue, etc.

### Understanding the Chart
- All values are normalized to 0-1 scale
- Hover over points to see ACTUAL values
- Example tooltip:
  ```
  PE Ratio: 25.18
  Normalized: 0.0837
  ```

### Exporting Data
- Click "Show Data Table" to view raw data
- Click "Download as CSV" to export current sector data

## 📁 File Structure

```
sector-dashboard/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── app.js             # JavaScript logic
└── README.md          # This file
```

## 🔧 Customization

### Adding More Sectors

Edit `app.js` and add to `SECTOR_DATA`:

```javascript
newsector: {
    name: 'NIFTY NEW SECTOR',
    index: [array of 11 values],
    pe: [array of 11 values],
    revenue: [array of 11 values],
    constituents: 15,
    topStock: 'Company Name',
    topStockWeight: 'XX.XX%'
}
```

Then add to the dropdown in `index.html`:
```html
<option value="newsector">NIFTY NEW SECTOR</option>
```

### Changing Colors

Edit CSS variables in `styles.css`:
```css
:root {
    --primary: #667eea;    /* Main brand color */
    --secondary: #764ba2;  /* Secondary color */
    --accent: #f093fb;     /* Accent color */
}
```

### Modifying Chart Appearance

Edit the Chart.js options in `app.js` within the `createChart()` function.

## 🎯 Key Metrics Explained

- **Index Value**: The sector index closing value
- **PE Ratio**: Price-to-Earnings ratio
- **EPS**: Earnings Per Share (calculated as Index ÷ PE)
- **Revenue/Share**: Revenue per share for the sector
- **CAGR**: Compound Annual Growth Rate over 10 years
- **Normalized Values**: Each metric divided by its maximum value (0-1 scale)

## 🐛 Troubleshooting

### Chart Not Showing
- Check browser console for errors
- Ensure Chart.js CDN is accessible
- Try refreshing the page
- Clear browser cache

### Data Not Updating
- Click the "🔄 Refresh Chart" button
- Check if JavaScript is enabled in browser
- Try a different browser

### Responsive Issues
- Dashboard is optimized for screens 320px and above
- Try zooming out on smaller screens
- Landscape mode recommended for mobile

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 📄 License

This project is open source and available for educational and commercial use.

## 🤝 Contributing

Feel free to fork, modify, and use this dashboard for your own analysis needs!

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the code comments in `app.js`
3. Open an issue on GitHub

## 🎓 Learning Resources

- [Chart.js Documentation](https://www.chartjs.org/docs/latest/)
- [GitHub Pages Guide](https://pages.github.com/)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)

## 🔄 Updates

### Version 1.0.0 (Current)
- Initial release with 5 sectors
- Normalized chart comparison
- Real value tooltips
- Responsive design
- CSV export functionality

---

**Made with ❤️ for Indian Stock Market Analysis**

**Last Updated**: March 2026
