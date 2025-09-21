# MVP Waste Management Platform - Image Manifest

This document tracks all images used across the MVP platform, organized by functionality and location.

## Image Categories and Usage

### 1. Hero & Background Images

#### Main Landing Page (index.html)
- **Background Collage**: Three environmental images showing waste segregation, collection, and teamwork
  - Left: `https://images.unsplash.com/photo-1532996122724-e3c354a0b15b` (Recycling/bottles)
  - Center: `https://images.unsplash.com/photo-1604187351574-c75ca79f5807` (Workers collecting waste)
  - Right: `https://images.unsplash.com/photo-1559827260-dc66d52bef19` (Environmental sustainability)

#### Waste Type Categories
- **Wet Waste**: `https://images.unsplash.com/photo-1542838132-92c53300491e` (Organic waste/compost)
- **Dry Waste**: `https://images.unsplash.com/photo-1532996122724-e3c354a0b15b` (Recyclable materials)
- **Hazardous Waste**: `https://images.unsplash.com/photo-1591696547064-8749af4ac0b0` (Hazardous materials)

#### Role-Specific Images
- **Citizen Role**: `https://images.unsplash.com/photo-1560472354-b33ff0c44a43` (Mobile app usage)
- **Worker Role**: `https://images.unsplash.com/photo-1604187351574-c75ca79f5807` (Collection workers)
- **Admin Role**: `https://images.unsplash.com/photo-1552581234-26160f608093` (Administrative team)

### 2. Portal-Specific Images

#### Login Pages
- **Main Login**: `https://images.unsplash.com/photo-1614149162883-504ce4d13909` (Waste management data)
- **Admin Login**: `https://images.unsplash.com/photo-1552581234-26160f608093` (Administrative dashboard)
- **Portal Logo**: `https://images.unsplash.com/photo-1559827260-dc66d52bef19` (Environmental sustainability icon)

#### Worker Portal (worker/second/index.html)
- **Header Background**: `https://images.unsplash.com/photo-1604187351574-c75ca79f5807` (Collection workers)
- **Worker Monitoring**: `https://images.unsplash.com/photo-1621111848501-8d3634f82336` (Worker monitoring)
- **Garbage Collection**: `https://images.unsplash.com/photo-1532996122724-e3c354a0b15b` (Garbage sorting)
- **Collection Truck**: `https://images.unsplash.com/photo-1610452203271-57b5d78e5bc1` (Waste collection vehicle)
- **Industrial Processing**: `https://images.unsplash.com/photo-1591696547064-8749af4ac0b0` (Industrial waste processing)
- **Analytics Background**: `https://images.unsplash.com/photo-1611273426858-450d8e3c9fce` (Data analytics)

#### Citizen Portal
- **Profile Header**: `https://images.unsplash.com/photo-1560472354-b33ff0c44a43` (Environmental contribution)
- **Profile Icon**: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d` (User profile)
- **Data Visualization**: `https://images.unsplash.com/photo-1614149162883-504ce4d13909` (Waste collection data)

#### Training Section
- **Hero Image**: `https://images.unsplash.com/photo-1558618666-fcd25c85cd64` (Education/learning)
- **Wet Waste Icon**: `https://images.unsplash.com/photo-1542838132-92c53300491e` (Organic waste)
- **Dry Waste Icon**: `https://images.unsplash.com/photo-1532996122724-e3c354a0b15b` (Recyclables)
- **Hazardous Waste Icon**: `https://images.unsplash.com/photo-1591696547064-8749af4ac0b0` (Hazardous materials)
- **Best Practices**: `https://images.unsplash.com/photo-1493946740644-2d8a1a6aff` (Environmental practices)
- **Swachh Bharat**: `https://images.unsplash.com/photo-1559827260-dc66d52bef19` (Clean India mission)

#### Admin Portal (admin/champions/dashboard.html)
- **Header Background**: `https://images.unsplash.com/photo-1559827260-dc66d52bef19` (Environmental leadership)
- **Champion Icon**: `https://images.unsplash.com/photo-1621111848501-8d3634f82336` (Green champion)

### 3. Image Optimization Standards

#### Size Guidelines
- **Hero Images**: 1200px width, optimized for responsive display
- **Background Images**: 800px width for performance
- **Icons**: 80-100px for profile/logo images
- **Decorative Elements**: 200px for corner decorations

#### Performance Optimizations
- All images use Unsplash's automatic optimization (`auto=format`)
- Quality set to 80 for balance of quality and performance
- Responsive sizing with Tailwind CSS classes
- Lazy loading implemented where appropriate

#### Responsive Design
- Images scale properly across device sizes
- Background images adjust position on mobile
- Icon sizes remain consistent across breakpoints
- Opacity overlays ensure text readability

### 4. Accessibility Considerations

- All images include descriptive alt text
- Decorative images marked appropriately
- Text contrast maintained over background images
- Images do not interfere with content readability

### 5. Copyright and Licensing

All images sourced from Unsplash.com under their license:
- Free to use for commercial and non-commercial purposes
- No permission required from photographer or Unsplash
- Attribution appreciated but not required

### 6. Future Enhancements

Potential improvements for production:
- Host images locally for better control and performance
- Implement WebP format for better compression
- Add progressive loading for large images
- Consider CDN for global image delivery
- Implement image caching strategies

---

*Last Updated: September 19, 2025*
*Platform: MVP Waste Management Portal*