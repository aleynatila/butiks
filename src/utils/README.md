# Storage Utility

## Problem: "Access to storage is not allowed from this context"

This error occurs when trying to access `localStorage` or `sessionStorage` in restricted contexts:

- **Browser privacy settings**: Users with strict privacy/security settings or browser extensions that block storage
- **Incognito/Private mode**: Some browsers restrict localStorage in private browsing
- **iframe contexts**: Cross-origin iframe restrictions
- **File protocol**: Opening HTML files directly from filesystem (file://)
- **Browser extensions**: Some extensions block storage APIs for privacy

## Solution: Safe Storage Wrapper

The `storage.js` utility provides a safe wrapper around localStorage with:

1. **Error handling**: Catches and logs storage access errors
2. **Fallback storage**: Uses in-memory Map when localStorage is unavailable
3. **Consistent API**: Same interface as localStorage (getItem, setItem, removeItem, clear)
4. **Graceful degradation**: App continues working even when localStorage is blocked

## Usage

```javascript
import storage from '../utils/storage';

// Get item
const token = storage.getItem('authToken');

// Set item
storage.setItem('authToken', 'abc123');

// Remove item
storage.removeItem('authToken');

// Clear all
storage.clear();

// Check availability
if (storage.isAvailable()) {
  console.log('localStorage is available');
}
```

## Implementation

All localStorage calls have been replaced with the safe storage utility in:

- `/src/services/api.js` - Auth token management
- `/src/services/api.service.js` - User authentication
- `/src/services/apiClient.js` - API request interceptors
- `/src/context/ShopContext.jsx` - Cart and favorites state
- `/src/context/ShopContextNew.jsx` - Cart state
- `/src/pages/AccountPage.jsx` - Authentication checks

## Benefits

✅ **No more crashes** when storage is blocked  
✅ **Better user experience** with graceful fallbacks  
✅ **Session persistence** when possible  
✅ **Debug-friendly** with console warnings  
✅ **Privacy-respecting** - works in restricted environments
