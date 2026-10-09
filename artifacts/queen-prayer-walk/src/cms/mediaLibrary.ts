import walkingPhotoDefault from '../../attached_assets/sisters-walking.jpg';
import refinedHeroPhotoDefault from '../../attached_assets/queen-prayer-walk-refined-hero.png';
import prayerPhotoDefault from '../../attached_assets/prayer-circle.jpg';

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  category: 'original' | 'community' | 'nature' | 'books' | 'prayer';
  description: string;
}

export const DEFAULT_PHOTOS = {
  hero: refinedHeroPhotoDefault,
  walking: walkingPhotoDefault,
  prayer: prayerPhotoDefault,
};

export const CURATED_LIBRARY: MediaItem[] = [
  {
    id: 'original-hero',
    name: 'Original Refined Hero',
    url: refinedHeroPhotoDefault,
    category: 'original',
    description: 'Golden hour path with sisters walking together',
  },
  {
    id: 'original-walking',
    name: 'Original Sisters Walking',
    url: walkingPhotoDefault,
    category: 'original',
    description: 'Quiet outdoor walking path in nature',
  },
  {
    id: 'original-prayer',
    name: 'Original Prayer Circle',
    url: prayerPhotoDefault,
    category: 'original',
    description: 'Warm outdoor prayer gathering in a circle',
  },
  {
    id: 'curated-morning-walk',
    name: 'Morning Sunlit Trail',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
    category: 'nature',
    description: 'Sun filtering through trees along a gentle walking path',
  },
  {
    id: 'curated-fellowship-friends',
    name: 'Fellowship in the Park',
    url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80',
    category: 'community',
    description: 'Group of smiling women walking and sharing in good spirits',
  },
  {
    id: 'curated-peaceful-hands',
    name: 'Hands Held in Prayer',
    url: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1600&q=80',
    category: 'prayer',
    description: 'Quiet moment of holding hands and praying outdoors',
  },
  {
    id: 'curated-scripture-journal',
    name: 'Scripture & Journal',
    url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1600&q=80',
    category: 'books',
    description: 'Open book, journal and warm tea in gentle daylight',
  },
  {
    id: 'curated-wildflower-meadow',
    name: 'Lavender & Wildflowers',
    url: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&w=1600&q=80',
    category: 'nature',
    description: 'Calm purple meadow reflecting grace and stillness',
  },
  {
    id: 'curated-golden-hour-walk',
    name: 'Golden Hour Walk',
    url: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1600&q=80',
    category: 'nature',
    description: 'Tranquil countryside path bathed in evening light',
  },
];

/**
 * Reads a user-selected File and returns a Base64 data URL.
 * Automatically checks file size to prevent browser storage overload.
 */
export function readFileAsDataUrl(file: File, maxSizeMb = 3): Promise<string> {
  return new Promise((resolve, reject) => {
    if (file.size > maxSizeMb * 1024 * 1024) {
      reject(new Error(`Image is larger than ${maxSizeMb}MB. Please select an image under ${maxSizeMb}MB or use a URL.`));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read image as data URL'));
      }
    };
    reader.onerror = () => reject(reader.error ?? new Error('File read error'));
    reader.readAsDataURL(file);
  });
}

