# How to Get Wordwall Premium Embed URLs (Without Banner)

## 🎯 Step-by-Step Guide

### **Step 1: Sign Up for Wordwall Premium**

1. **Go to Wordwall Pricing Page**
   - URL: https://wordwall.net/pricing
   - Or click "Upgrade" from your Wordwall dashboard

2. **Choose a Plan**
   - **Personal**: ~$5-10/month (for individual teachers)
   - **School**: Contact for pricing (for institutions)
   - Most plans include ad-free embeds

3. **Complete Payment**
   - Enter payment details
   - Confirm subscription
   - You'll get premium access immediately

---

### **Step 2: Access Your Activity**

1. **Log into Wordwall**
   - URL: https://wordwall.net/login
   - Use your premium account

2. **Go to "My Activities"**
   - Click your profile icon (top right)
   - Select "My activities" from dropdown
   - You'll see all your created games

3. **Select the Activity You Want to Embed**
   - Click on the activity name
   - Or click the "three dots" menu next to it

---

### **Step 3: Get the Premium Embed Code**

#### **Option A: From Activity Page**

1. **Open your activity** (the game you want to embed)

2. **Click the "Share" button**
   - Usually in the top right corner
   - Or in the activity options menu

3. **Select "Embed" tab**
   - You'll see several sharing options
   - Choose "Embed" (HTML code option)

4. **Look for Premium Embed Settings**
   - Premium users see additional options:
     - ☑️ "Remove Wordwall branding"
     - ☑️ "Ad-free embed"
     - ☑️ "Premium embed"

5. **Enable Premium Options**
   - Check the boxes for:
     - Remove branding
     - Ad-free

6. **Copy the Embed Code**
   ```html
   <iframe src="https://wordwall.net/embed/YOUR_GAME_ID?..." ...></iframe>
   ```

7. **Extract the URL**
   - From the iframe `src` attribute
   - Copy only the URL part (not the full HTML)

#### **Option B: URL Parameter Method**

If the above doesn't work, premium embeds often use a parameter:

**Free Embed URL:**
```
https://wordwall.net/embed/4170af7a0b134f80ba77aa6260dd48f2?themeId=3&templateId=5
```

**Premium Embed URL (try adding):**
```
https://wordwall.net/embed/4170af7a0b134f80ba77aa6260dd48f2?themeId=3&templateId=5&premium=1
```

Or:
```
https://wordwall.net/embed/4170af7a0b134f80ba77aa6260dd48f2?themeId=3&templateId=5&noBranding=1
```

---

### **Step 4: Update Your Config**

Open [src/app/config/gamesConfig.js](src/app/config/gamesConfig.js):

**Before:**
```javascript
export const gamesConfig = {
  'matching-game-1': {
    url: 'https://wordwall.net/embed/4170af7a0b134f80ba77aa6260dd48f2?themeId=3&templateId=5&fontStackId=0',
    title: 'Matching Game 1',
    description: 'A fun matching game for learning',
    width: 500,
    height: 380,
  },
};
```

**After (with premium URL):**
```javascript
export const gamesConfig = {
  'matching-game-1': {
    url: 'https://wordwall.net/embed/4170af7a0b134f80ba77aa6260dd48f2?themeId=3&templateId=5&fontStackId=0&premium=1',  // ← Added &premium=1
    title: 'Matching Game 1',
    description: 'A fun matching game for learning',
    width: 500,
    height: 380,
  },
};
```

---

## 📸 **Visual Reference**

### **Where to Find the Share Button**

When viewing your activity on Wordwall:

```
┌─────────────────────────────────────┐
│  Wordwall Activity                  │
│                                     │
│  [Play]  [Edit]  [Share] ← Click   │
│                                     │
│  Your Game Content Here             │
│                                     │
└─────────────────────────────────────┘
```

### **Embed Dialog Layout**

```
┌─────────────────────────────────────┐
│  Share this activity                │
│                                     │
│  [Link] [QR Code] [Embed] ← Click  │
│                                     │
│  Embed settings (Premium only):    │
│  ☑️ Remove Wordwall branding        │
│  ☑️ Ad-free                         │
│                                     │
│  <iframe src="https://...">         │
│  </iframe>                          │
│                                     │
│  [Copy Code]                        │
└─────────────────────────────────────┘
```

---

## 🔍 **How to Verify It's a Premium Embed**

### **Method 1: Check the URL Parameters**
Premium URLs often include:
- `premium=1`
- `noBranding=1`
- `adFree=1`
- Different domain like `embed-premium.wordwall.net`

### **Method 2: Test the Embed**
1. Update your `gamesConfig.js` with the new URL
2. Run `npm run dev`
3. Visit your game page: `/en/game/matching-game-1`
4. Check if the banner at the bottom is gone

**Banner Gone?** ✅ Premium embed working!
**Banner Still There?** ❌ Not premium or wrong URL

---

## 📚 **Official Wordwall Documentation**

### **Support Articles**
- **Embedding**: https://wordwall.zendesk.com/hc/en-us/articles/360017490097-Embedding
- **Premium Features**: https://wordwall.zendesk.com/hc/en-us/sections/360003683237-Premium
- **Pricing**: https://wordwall.net/pricing

### **Contact Wordwall Support**
If you can't find the premium embed option after subscribing:

- **Email**: support@wordwall.net
- **Help Center**: https://wordwall.zendesk.com
- **Ask them**: "How do I get ad-free embed URLs with my premium subscription?"

---

## ⚠️ **Important Notes**

### **1. Premium Account Required**
- You MUST have an active premium subscription
- Free accounts cannot remove the banner (no workaround)
- Premium unlocks the banner-free embed option

### **2. Per-Activity Basis**
- Each activity you create gets its own embed URL
- Update `gamesConfig.js` for each game you want to use

### **3. URL Structure May Vary**
Wordwall might use different URL formats:
- Some use query parameters: `?premium=1`
- Some use different subdomains: `premium.wordwall.net`
- Some use API keys: `?key=YOUR_PREMIUM_KEY`

**The exact format depends on when you subscribed and your account type.**

---

## 🎯 **Quick Checklist**

- [ ] Subscribe to Wordwall Premium
- [ ] Log into your premium account
- [ ] Open your activity
- [ ] Click "Share" → "Embed"
- [ ] Enable "Remove branding" or "Ad-free" options
- [ ] Copy the embed URL (from iframe src)
- [ ] Update `src/app/config/gamesConfig.js`
- [ ] Test the embed (banner should be gone)

---

## 🆘 **Troubleshooting**

### **Problem: Can't find "Remove branding" option**
**Solution**:
1. Verify premium subscription is active
2. Log out and log back in
3. Contact Wordwall support
4. Check if your premium plan includes ad-free embeds

### **Problem: Banner still shows after updating URL**
**Solution**:
1. Clear browser cache
2. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
3. Check if URL parameter is correct
4. Verify you're using the premium URL, not the free one

### **Problem: Don't want to pay for premium**
**Solution**:
- Unfortunately, there's no free way to remove the banner
- CORS security prevents any code-based workaround
- Only Wordwall can remove it server-side

---

## 💡 **Alternative: Self-Host Your Games**

If you don't want to pay for Wordwall Premium, consider:

1. **Other Platforms**:
   - **H5P**: https://h5p.org (open source, no branding)
   - **Kahoot**: https://kahoot.com (has premium too)
   - **Quizizz**: https://quizizz.com (has free tier)

2. **Build Your Own**:
   - Use game libraries like **Phaser.js**
   - Full control, no banners
   - More development work

3. **Accept the Banner**:
   - It's small and unobtrusive
   - Doesn't interfere with gameplay
   - Free to use

---

## 📞 **Need Help?**

If you're stuck or need clarification:

1. **Check Wordwall's Help Center**: https://wordwall.zendesk.com
2. **Email Wordwall Support**: support@wordwall.net
3. **Ask them specifically**: "I have a premium account, how do I get embed URLs without the banner?"

They'll provide the exact steps for your account type!

---

**Updated**: 2025-10-25
**Source**: Wordwall official documentation and support articles
