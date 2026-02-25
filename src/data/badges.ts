export interface BadgeDef {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: 'turkce' | 'matematik' | 'fen' | 'tarih' | 'ingilizce' | 'din' | 'ozel';
  rarity: 'bronz' | 'demir' | 'altin' | 'ozel' | 'efsanevi';
}

function subjectBadges(subjectId: string, subjectName: string, icon: string): BadgeDef[] {
  return [
    { id: `${subjectId}_bronz`, name: `Bronz ${subjectName}`, icon: '🥉', description: `${subjectName} 10 doğru`, category: subjectId as any, rarity: 'bronz' },
    { id: `${subjectId}_demir`, name: `Demir ${subjectName}`, icon: '⚙️', description: `${subjectName} 25 doğru`, category: subjectId as any, rarity: 'demir' },
    { id: `${subjectId}_altin`, name: `Altın ${subjectName}`, icon: '🥇', description: `${subjectName} 50 doğru`, category: subjectId as any, rarity: 'altin' },
    { id: `${subjectId}_usta`, name: `${subjectName} Ustası`, icon: '🎓', description: `${subjectName} 100 doğru`, category: subjectId as any, rarity: 'ozel' },
    { id: `${subjectId}_sampiyon`, name: `${subjectName} Şampiyonu`, icon: '🏆', description: `${subjectName} 200 doğru`, category: subjectId as any, rarity: 'ozel' },
    { id: `${subjectId}_deha`, name: `${subjectName} Dehası`, icon: '🧠', description: `${subjectName} 500 doğru`, category: subjectId as any, rarity: 'efsanevi' },
    { id: `${subjectId}_hiz`, name: `${subjectName} Hız Kurşunu`, icon: '⚡', description: `${subjectName} 5sn altı cevap`, category: subjectId as any, rarity: 'ozel' },
    { id: `${subjectId}_seri`, name: `${subjectName} Serisi`, icon: '🔥', description: `${subjectName} 5 üst üste`, category: subjectId as any, rarity: 'ozel' },
    { id: `${subjectId}_mukemmel`, name: `${subjectName} Mükemmelci`, icon: '💯', description: `${subjectName} %100 quiz`, category: subjectId as any, rarity: 'ozel' },
    { id: `${subjectId}_kasif`, name: `${subjectName} Kaşifi`, icon: '🗺️', description: `${subjectName} tüm konuları dene`, category: subjectId as any, rarity: 'ozel' },
  ];
}

const SPECIAL_BADGES: BadgeDef[] = [
  { id: 'profesor', name: 'Profesör', icon: '👨‍🏫', description: 'Bir quizi hatasız bitir', category: 'ozel', rarity: 'efsanevi' },
  { id: 'terminator', name: 'Terminatör', icon: '🤖', description: 'Tüm konuları çöz', category: 'ozel', rarity: 'efsanevi' },
  { id: 'seri_katil', name: 'Seri Katil', icon: '🔥', description: '10 doğru üst üste', category: 'ozel', rarity: 'ozel' },
  { id: 'hiz_ustasi', name: 'Hız Ustası', icon: '⚡', description: '5sn altı cevap ver', category: 'ozel', rarity: 'ozel' },
  { id: 'ilk_adim', name: 'İlk Adım', icon: '👣', description: 'İlk quizi bitir', category: 'ozel', rarity: 'bronz' },
  { id: 'sosyal_kelebek', name: 'Sosyal Kelebek', icon: '🦋', description: 'İlk mesajı gönder', category: 'ozel', rarity: 'bronz' },
  { id: 'caliskan_ari', name: 'Çalışkan Arı', icon: '🐝', description: '50 quiz bitir', category: 'ozel', rarity: 'altin' },
  { id: 'bilgi_deposu', name: 'Bilgi Deposu', icon: '📦', description: '1000 soru cevapla', category: 'ozel', rarity: 'efsanevi' },
  { id: 'efsane', name: 'Efsane', icon: '👑', description: 'Skor tablosunda 1. ol', category: 'ozel', rarity: 'efsanevi' },
  { id: 'azimli', name: 'Azimli', icon: '💪', description: '3 gün üst üste quiz çöz', category: 'ozel', rarity: 'ozel' },
];

export const ALL_BADGES: BadgeDef[] = [
  ...subjectBadges('turkce', 'Türkçeci', '📖'),
  ...subjectBadges('matematik', 'Matematikçi', '🔢'),
  ...subjectBadges('fen', 'Bilim İnsanı', '🔬'),
  ...subjectBadges('tarih', 'Tarihçi', '🏛️'),
  ...subjectBadges('ingilizce', 'İngilizci', '🌍'),
  ...subjectBadges('din', 'Din Bilgini', '☪️'),
  ...SPECIAL_BADGES,
];

export function getBadgesByCategory(category: string): BadgeDef[] {
  return ALL_BADGES.filter(b => b.category === category);
}

export function getBadgeById(id: string): BadgeDef | undefined {
  return ALL_BADGES.find(b => b.id === id);
}

export function getRarityColor(rarity: string): string {
  switch (rarity) {
    case 'bronz': return 'from-amber-600 to-amber-800';
    case 'demir': return 'from-gray-400 to-gray-600';
    case 'altin': return 'from-yellow-400 to-yellow-600';
    case 'ozel': return 'from-purple-400 to-purple-600';
    case 'efsanevi': return 'from-red-500 to-pink-500';
    default: return 'from-gray-300 to-gray-500';
  }
}
