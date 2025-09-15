## feat: Implement responsive navigation system with Dynamic Island and burger menu

### Summary
- Added Dynamic Island navigation for desktop/tablet (≥550px)
- Implemented classic burger menu with slide-out drawer for mobile (<550px)
- Fixed mobile layout scaling and overflow issues
- Fixed language selector functionality in burger menu
- Cleaned up UI by removing unused profile/notifications buttons

### Changes Made

#### Dynamic Island Navigation
- Created modular component system with 4 modes: Compact, Expanded, Search, Language
- Added responsive breakpoints for proper scaling across devices
- Implemented smooth animations using React Spring
- Fixed overflow issues on tablets (645px-872px range)
- Added mobile detection for adaptive heights

#### Mobile Burger Menu
- Created slide-out navigation drawer with glass morphism design
- Added animated burger icon that hides when menu is open to prevent overlap
- Implemented close button on right side of menu header
- Added backdrop overlay with click-to-close functionality
- Included search bar, navigation items, and utility buttons
- Prevents body scroll when menu is open
- Fixed language selector with interactive submenu (no longer closes menu on click)
- Added back button for language selection navigation
- Commented out profile and notifications buttons until needed

#### Responsive Improvements
- Updated breakpoint strategy: <550px burger menu, ≥550px Dynamic Island
- Fixed width calculations to prevent content overflow
- Added responsive text and icon sizing
- Implemented horizontal scrollable layout for expanded mode
- Created scrollbar-hide utility class for cleaner mobile UI

#### Files Modified
- `src/components/layout/DynamicIsland.tsx` - Main Dynamic Island component
- `src/components/layout/dynamic-island/CompactMode.tsx` - Compact navigation mode
- `src/components/layout/dynamic-island/ExpandedMode.tsx` - Full navigation mode
- `src/components/layout/dynamic-island/SearchMode.tsx` - Search interface
- `src/components/layout/dynamic-island/LanguageMode.tsx` - Language selector
- `src/components/layout/MobileBurgerMenu.tsx` - New burger menu component
- `src/components/layout/ClientLayout.tsx` - Layout integration
- `src/app/globals.css` - Added scrollbar-hide utility

### Technical Details
- Used React Spring for smooth animations
- Implemented proper z-index management for overlays
- Added TypeScript interfaces for type safety
- Ensured accessibility with ARIA labels
- Maintained consistent glass morphism design language

### Bug Fixes
- Fixed language selector in burger menu - now shows language options instead of closing menu
- Fixed burger button overlap by hiding it when menu is open
- Removed unused UI elements to reduce clutter

### Testing
- Tested across multiple breakpoints (400px, 550px, 645px, 768px, 872px)
- Verified menu interactions and animations
- Confirmed language selection works correctly
- Confirmed no TypeScript errors
- Validated responsive behavior on actual mobile devices