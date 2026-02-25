export interface Question {
  id: string;
  subject: Subject;
  difficulty: 'kolay' | 'orta' | 'zor';
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  tags: string[];
}

export type Subject = 'turkce' | 'matematik' | 'fen' | 'tarih' | 'ingilizce' | 'din';

export interface SubjectInfo {
  id: Subject;
  name: string;
  icon: string;
  gradient: string;
}

export const SUBJECTS: SubjectInfo[] = [
  { id: 'turkce', name: 'Türkçe', icon: '📖', gradient: 'gradient-turkce' },
  { id: 'matematik', name: 'Matematik', icon: '🔢', gradient: 'gradient-matematik' },
  { id: 'fen', name: 'Fen Bilimleri', icon: '🔬', gradient: 'gradient-fen' },
  { id: 'tarih', name: 'T.C. İnkılap Tarihi', icon: '🏛️', gradient: 'gradient-tarih' },
  { id: 'ingilizce', name: 'İngilizce', icon: '🌍', gradient: 'gradient-ingilizce' },
  { id: 'din', name: 'Din Kültürü', icon: '☪️', gradient: 'gradient-din' },
];

export const questions: Question[] = [
  // TÜRKÇE
  { id: 't1', subject: 'turkce', difficulty: 'kolay', question: '"Kitap" kelimesinin eş anlamlısı hangisidir?', options: ['Defter', 'Yapıt', 'Kalem', 'Sayfa'], correctIndex: 1, explanation: 'Kitap kelimesinin eş anlamlısı yapıttır.', tags: ['eş anlam'] },
  { id: 't2', subject: 'turkce', difficulty: 'kolay', question: 'Aşağıdakilerden hangisi bir bağlaçtır?', options: ['Güzel', 'Fakat', 'Hızla', 'Kitap'], correctIndex: 1, explanation: 'Fakat bir bağlaçtır.', tags: ['sözcük türleri'] },
  { id: 't3', subject: 'turkce', difficulty: 'orta', question: '"Gözden düşmek" deyiminin anlamı nedir?', options: ['Yüksekten bakmak', 'İtibarını kaybetmek', 'Ağlamak', 'Görmemek'], correctIndex: 1, explanation: 'Gözden düşmek itibarını kaybetmek anlamına gelir.', tags: ['deyimler'] },
  { id: 't4', subject: 'turkce', difficulty: 'orta', question: 'Hangisi bir isim tamlamasıdır?', options: ['Güzel ev', 'Okul bahçesi', 'Hızlı koştu', 'Kırmızı araba'], correctIndex: 1, explanation: 'Okul bahçesi belirtisiz isim tamlamasıdır.', tags: ['tamlama'] },
  { id: 't5', subject: 'turkce', difficulty: 'zor', question: '"Ses bilgisi" konusunda hangisi doğrudur?', options: ['Türkçede 29 harf vardır', 'Türkçede 26 harf vardır', 'Türkçede 30 harf vardır', 'Türkçede 24 harf vardır'], correctIndex: 0, explanation: 'Türk alfabesinde 29 harf bulunur.', tags: ['ses bilgisi'] },
  { id: 't6', subject: 'turkce', difficulty: 'kolay', question: '"Büyük" kelimesinin zıt anlamlısı nedir?', options: ['Geniş', 'Uzun', 'Küçük', 'Yüksek'], correctIndex: 2, explanation: 'Büyük kelimesinin zıt anlamlısı küçüktür.', tags: ['zıt anlam'] },
  { id: 't7', subject: 'turkce', difficulty: 'orta', question: 'Aşağıdakilerden hangisi birleşik sözcüktür?', options: ['Deniz yıldızı', 'Kara tahta', 'Hanımeli', 'Güzel kız'], correctIndex: 2, explanation: 'Hanımeli birleşik sözcüktür, bitişik yazılır.', tags: ['sözcük yapısı'] },
  { id: 't8', subject: 'turkce', difficulty: 'zor', question: '"Ne kadar çalışırsa o kadar başarılı olur" cümlesinde hangi bağlaç kullanılmıştır?', options: ['Ne...ne', 'Ne kadar...o kadar', 'Ya...ya', 'Hem...hem'], correctIndex: 1, explanation: 'Bağlama bağlacı olarak "ne kadar...o kadar" kullanılmıştır.', tags: ['bağlaçlar'] },

  // MATEMATİK
  { id: 'm1', subject: 'matematik', difficulty: 'kolay', question: '15 + 27 = ?', options: ['41', '42', '43', '40'], correctIndex: 1, explanation: '15 + 27 = 42', tags: ['toplama'] },
  { id: 'm2', subject: 'matematik', difficulty: 'kolay', question: '8 × 7 = ?', options: ['54', '55', '56', '57'], correctIndex: 2, explanation: '8 × 7 = 56', tags: ['çarpma'] },
  { id: 'm3', subject: 'matematik', difficulty: 'orta', question: 'Bir üçgenin iç açıları toplamı kaç derecedir?', options: ['90°', '180°', '270°', '360°'], correctIndex: 1, explanation: 'Bir üçgenin iç açıları toplamı 180 derecedir.', tags: ['geometri'] },
  { id: 'm4', subject: 'matematik', difficulty: 'orta', question: '√144 kaçtır?', options: ['11', '12', '13', '14'], correctIndex: 1, explanation: '12 × 12 = 144, yani √144 = 12', tags: ['kök'] },
  { id: 'm5', subject: 'matematik', difficulty: 'zor', question: '2^10 kaçtır?', options: ['512', '1024', '2048', '256'], correctIndex: 1, explanation: '2^10 = 1024', tags: ['üslü sayılar'] },
  { id: 'm6', subject: 'matematik', difficulty: 'kolay', question: '100 - 37 = ?', options: ['63', '67', '73', '53'], correctIndex: 0, explanation: '100 - 37 = 63', tags: ['çıkarma'] },
  { id: 'm7', subject: 'matematik', difficulty: 'orta', question: 'Bir dikdörtgenin çevresi nasıl hesaplanır?', options: ['a × b', '2(a + b)', 'a + b', '4a'], correctIndex: 1, explanation: 'Dikdörtgenin çevresi = 2(a + b)', tags: ['geometri'] },
  { id: 'm8', subject: 'matematik', difficulty: 'zor', question: 'x² - 5x + 6 = 0 denkleminin kökleri nelerdir?', options: ['1 ve 6', '2 ve 3', '-2 ve -3', '1 ve 5'], correctIndex: 1, explanation: '(x-2)(x-3) = 0, x = 2 veya x = 3', tags: ['denklem'] },

  // FEN BİLİMLERİ
  { id: 'f1', subject: 'fen', difficulty: 'kolay', question: 'Suyun kimyasal formülü nedir?', options: ['CO2', 'H2O', 'O2', 'NaCl'], correctIndex: 1, explanation: 'Suyun kimyasal formülü H2O\'dur.', tags: ['kimya'] },
  { id: 'f2', subject: 'fen', difficulty: 'kolay', question: 'Güneş sisteminde kaç gezegen vardır?', options: ['7', '8', '9', '10'], correctIndex: 1, explanation: 'Güneş sisteminde 8 gezegen vardır.', tags: ['astronomi'] },
  { id: 'f3', subject: 'fen', difficulty: 'orta', question: 'Fotosentez sırasında hangi gaz açığa çıkar?', options: ['Karbondioksit', 'Azot', 'Oksijen', 'Hidrojen'], correctIndex: 2, explanation: 'Fotosentez sırasında oksijen açığa çıkar.', tags: ['biyoloji'] },
  { id: 'f4', subject: 'fen', difficulty: 'orta', question: 'Hangi vitamin güneş ışığından sentezlenir?', options: ['A vitamini', 'B vitamini', 'C vitamini', 'D vitamini'], correctIndex: 3, explanation: 'D vitamini güneş ışığı ile ciltte sentezlenir.', tags: ['biyoloji'] },
  { id: 'f5', subject: 'fen', difficulty: 'zor', question: 'Newton\'un 2. hareket yasası hangisidir?', options: ['F = m × a', 'E = mc²', 'P = F/A', 'V = I × R'], correctIndex: 0, explanation: 'Newton\'un 2. yasası: Kuvvet = Kütle × İvme', tags: ['fizik'] },
  { id: 'f6', subject: 'fen', difficulty: 'kolay', question: 'Maddenin üç hali nelerdir?', options: ['Katı, sıvı, gaz', 'Katı, sıvı, plazma', 'Sıvı, gaz, buhar', 'Katı, buhar, gaz'], correctIndex: 0, explanation: 'Maddenin üç temel hali katı, sıvı ve gazdır.', tags: ['madde'] },
  { id: 'f7', subject: 'fen', difficulty: 'orta', question: 'DNA\'nın açılımı nedir?', options: ['Deoksiribonükleik Asit', 'Diribonükleik Asit', 'Deoksiriboz Asit', 'Dinamik Nükleik Asit'], correctIndex: 0, explanation: 'DNA = Deoksiribonükleik Asit', tags: ['biyoloji'] },
  { id: 'f8', subject: 'fen', difficulty: 'zor', question: 'Periyodik tabloda kaç element vardır? (2024)', options: ['112', '115', '118', '120'], correctIndex: 2, explanation: 'Periyodik tabloda 118 element tanımlanmıştır.', tags: ['kimya'] },

  // TARİH
  { id: 'h1', subject: 'tarih', difficulty: 'kolay', question: 'Türkiye Cumhuriyeti ne zaman ilan edildi?', options: ['1920', '1921', '1922', '1923'], correctIndex: 3, explanation: 'Cumhuriyet 29 Ekim 1923\'te ilan edildi.', tags: ['cumhuriyet'] },
  { id: 'h2', subject: 'tarih', difficulty: 'kolay', question: 'Atatürk\'ün doğum yeri neresidir?', options: ['İstanbul', 'Ankara', 'Selanik', 'İzmir'], correctIndex: 2, explanation: 'Mustafa Kemal Atatürk Selanik\'te doğmuştur.', tags: ['Atatürk'] },
  { id: 'h3', subject: 'tarih', difficulty: 'orta', question: 'Kurtuluş Savaşı\'nın son muharebesi hangisidir?', options: ['Sakarya', 'Büyük Taarruz', 'İnönü', 'Dumlupınar'], correctIndex: 1, explanation: 'Büyük Taarruz (26-30 Ağustos 1922) son muharebedir.', tags: ['kurtuluş savaşı'] },
  { id: 'h4', subject: 'tarih', difficulty: 'orta', question: 'TBMM ne zaman açıldı?', options: ['23 Nisan 1919', '23 Nisan 1920', '29 Ekim 1923', '19 Mayıs 1919'], correctIndex: 1, explanation: 'TBMM 23 Nisan 1920\'de açılmıştır.', tags: ['TBMM'] },
  { id: 'h5', subject: 'tarih', difficulty: 'zor', question: 'Harf inkılabı hangi yıl yapılmıştır?', options: ['1926', '1927', '1928', '1929'], correctIndex: 2, explanation: 'Harf inkılabı 1 Kasım 1928\'de yapılmıştır.', tags: ['inkılaplar'] },
  { id: 'h6', subject: 'tarih', difficulty: 'kolay', question: '19 Mayıs 1919\'da ne olmuştur?', options: ['Cumhuriyet ilan edildi', 'Atatürk Samsun\'a çıktı', 'TBMM açıldı', 'Lozan antlaşması imzalandı'], correctIndex: 1, explanation: 'Mustafa Kemal 19 Mayıs 1919\'da Samsun\'a çıkmıştır.', tags: ['kurtuluş savaşı'] },
  { id: 'h7', subject: 'tarih', difficulty: 'orta', question: 'Lozan Antlaşması hangi tarihte imzalanmıştır?', options: ['1921', '1922', '1923', '1924'], correctIndex: 2, explanation: 'Lozan Barış Antlaşması 24 Temmuz 1923\'te imzalanmıştır.', tags: ['antlaşmalar'] },
  { id: 'h8', subject: 'tarih', difficulty: 'zor', question: 'Aşağıdakilerden hangisi Atatürk ilkelerinden biri değildir?', options: ['Cumhuriyetçilik', 'Milliyetçilik', 'Liberalizm', 'Laiklik'], correctIndex: 2, explanation: 'Liberalizm Atatürk ilkeleri arasında yer almaz.', tags: ['Atatürk ilkeleri'] },

  // İNGİLİZCE
  { id: 'e1', subject: 'ingilizce', difficulty: 'kolay', question: '"Cat" kelimesinin Türkçe karşılığı nedir?', options: ['Köpek', 'Kuş', 'Kedi', 'Balık'], correctIndex: 2, explanation: 'Cat = Kedi', tags: ['kelime'] },
  { id: 'e2', subject: 'ingilizce', difficulty: 'kolay', question: '"I ___ a student." cümlesinde boşluğa ne gelir?', options: ['is', 'am', 'are', 'be'], correctIndex: 1, explanation: 'I am a student. (I ile "am" kullanılır)', tags: ['gramer'] },
  { id: 'e3', subject: 'ingilizce', difficulty: 'orta', question: '"She has been studying ___ two hours." Boşluğa ne gelir?', options: ['since', 'for', 'during', 'while'], correctIndex: 1, explanation: 'Süre belirtmek için "for" kullanılır.', tags: ['gramer'] },
  { id: 'e4', subject: 'ingilizce', difficulty: 'orta', question: '"Beautiful" kelimesinin zıt anlamlısı nedir?', options: ['Pretty', 'Ugly', 'Nice', 'Handsome'], correctIndex: 1, explanation: 'Beautiful (güzel) ↔ Ugly (çirkin)', tags: ['kelime'] },
  { id: 'e5', subject: 'ingilizce', difficulty: 'zor', question: 'Hangi cümle doğrudur?', options: ['He don\'t like it', 'He doesn\'t likes it', 'He doesn\'t like it', 'He not like it'], correctIndex: 2, explanation: '3. tekil şahısta doesn\'t + yalın fiil kullanılır.', tags: ['gramer'] },
  { id: 'e6', subject: 'ingilizce', difficulty: 'kolay', question: '"Monday" hangi gündür?', options: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba'], correctIndex: 1, explanation: 'Monday = Pazartesi', tags: ['kelime'] },
  { id: 'e7', subject: 'ingilizce', difficulty: 'orta', question: '"If I ___ rich, I would travel." Boşluğa ne gelir?', options: ['am', 'was', 'were', 'be'], correctIndex: 2, explanation: 'Second conditional: If + past subjunctive (were)', tags: ['gramer'] },
  { id: 'e8', subject: 'ingilizce', difficulty: 'zor', question: '"Exhausted" ne demektir?', options: ['Heyecanlı', 'Bitkin', 'Mutlu', 'Kızgın'], correctIndex: 1, explanation: 'Exhausted = Bitkin, çok yorgun', tags: ['kelime'] },

  // DİN KÜLTÜRÜ
  { id: 'd1', subject: 'din', difficulty: 'kolay', question: 'İslam\'ın beş şartından biri hangisidir?', options: ['Oruç', 'Spor', 'Okumak', 'Uyumak'], correctIndex: 0, explanation: 'Oruç tutmak İslam\'ın beş şartından biridir.', tags: ['ibadet'] },
  { id: 'd2', subject: 'din', difficulty: 'kolay', question: 'Kur\'an-ı Kerim kaç sureden oluşur?', options: ['100', '114', '120', '99'], correctIndex: 1, explanation: 'Kur\'an-ı Kerim 114 sureden oluşur.', tags: ['Kuran'] },
  { id: 'd3', subject: 'din', difficulty: 'orta', question: 'Ramazan ayında hangi ibadet yapılır?', options: ['Hac', 'Oruç', 'Kurban', 'Zekat'], correctIndex: 1, explanation: 'Ramazan ayında oruç tutulur.', tags: ['ibadet'] },
  { id: 'd4', subject: 'din', difficulty: 'orta', question: 'Hz. Muhammed hangi şehirde doğmuştur?', options: ['Medine', 'Mekke', 'Kudüs', 'Taif'], correctIndex: 1, explanation: 'Hz. Muhammed (s.a.v.) Mekke\'de doğmuştur.', tags: ['peygamber'] },
  { id: 'd5', subject: 'din', difficulty: 'zor', question: 'Kur\'an-ı Kerim\'in en uzun suresi hangisidir?', options: ['Yasin', 'Bakara', 'Nisa', 'Ali İmran'], correctIndex: 1, explanation: 'Bakara suresi 286 ayet ile en uzun suredir.', tags: ['Kuran'] },
  { id: 'd6', subject: 'din', difficulty: 'kolay', question: 'Günde kaç vakit namaz kılınır?', options: ['3', '4', '5', '6'], correctIndex: 2, explanation: 'Günde 5 vakit namaz kılınır.', tags: ['ibadet'] },
  { id: 'd7', subject: 'din', difficulty: 'orta', question: 'Hicret hangi yıl gerçekleşmiştir?', options: ['610', '620', '622', '632'], correctIndex: 2, explanation: 'Hicret 622 yılında gerçekleşmiştir.', tags: ['tarih'] },
  { id: 'd8', subject: 'din', difficulty: 'zor', question: 'Aşağıdakilerden hangisi "Kütüb-i Sitte" eserlerinden biridir?', options: ['Mesnevi', 'Sahih-i Buhari', 'Divan-ı Hikmet', 'Risale'], correctIndex: 1, explanation: 'Sahih-i Buhari, Kütüb-i Sitte\'den biridir.', tags: ['hadis'] },
];

export function getQuestionsBySubject(subject: Subject): Question[] {
  return questions.filter(q => q.subject === subject);
}

export function getRandomQuestions(subject: Subject, count: number = 10): Question[] {
  const subjectQuestions = getQuestionsBySubject(subject);
  const shuffled = [...subjectQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
